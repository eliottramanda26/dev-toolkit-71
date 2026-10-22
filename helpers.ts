export interface ProcessingTask {
  id: string;
  payload: Record<string, unknown>;
  priority?: number;
  timeoutMs?: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface ProcessedResult<T> {
  id: string;
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Validates an incoming task object against schema requirements before processing.
 */
export function validateTaskInput(task: unknown): ValidationResult {
  const errors: string[] = [];

  if (!task || typeof task !== 'object') {
    return { isValid: false, errors: ['Task must be a non-null object'] };
  }

  const t = task as Partial<ProcessingTask>;

  if (!t.id || typeof t.id !== 'string' || t.id.trim() === '') {
    errors.push('Task id must be a non-empty string');
  }

  if (!t.payload || typeof t.payload !== 'object' || Array.isArray(t.payload)) {
    errors.push('Task payload must be a valid object');
  }

  if (t.priority !== undefined && (typeof t.priority !== 'number' || t.priority < 0)) {
    errors.push('Task priority must be a non-negative number');
  }

  if (t.timeoutMs !== undefined && (typeof t.timeoutMs !== 'number' || t.timeoutMs <= 0)) {
    errors.push('Task timeoutMs must be a positive number');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Main processing loop that applies input validation before execution.
 */
export async function processTaskQueue<T>(
  tasks: unknown[],
  handler: (task: ProcessingTask) => Promise<T>
): Promise<ProcessedResult<T>[]> {
  const results: ProcessedResult<T>[] = [];

  for (const rawTask of tasks) {
    const validation = validateTaskInput(rawTask);

    if (!validation.isValid) {
      const fallbackId = (rawTask && typeof rawTask === 'object' && 'id' in rawTask)
        ? String((rawTask as { id: unknown }).id)
        : 'invalid-task-id';

      results.push({
        id: fallbackId,
        success: false,
        error: `Validation failed: ${validation.errors.join('; ')}`,
      });
      continue;
    }

    const validTask = rawTask as ProcessingTask;

    try {
      const output = await handler(validTask);
      results.push({ id: validTask.id, success: true, data: output });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      results.push({ id: validTask.id, success: false, error: message });
    }
  }

  return results;
}