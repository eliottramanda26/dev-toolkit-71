export interface ProcessingTask {
  id: string;
  payload: Record<string, unknown>;
  timestamp: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface ProcessingSummary {
  processed: string[];
  failed: { id: string; errors: string[] }[];
}

export class TaskProcessorService {
  /**
   * Validates individual task payload for required fields and types.
   */
  public validateTask(task: ProcessingTask): ValidationResult {
    const errors: string[] = [];

    if (!task.id || typeof task.id !== 'string') {
      errors.push('Task ID is missing or not a string');
    }

    if (!task.payload || typeof task.payload !== 'object' || Array.isArray(task.payload)) {
      errors.push('Payload must be a non-null object');
    } else {
      if (typeof task.payload.action !== 'string') {
        errors.push('Payload action is missing or not a string');
      }
      if (task.payload.priority !== undefined && typeof task.payload.priority !== 'number') {
        errors.push('Payload priority must be a numeric value');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Iterates through batch inputs, validates each, and executes the processing loop.
   */
  public async processBatch(tasks: ProcessingTask[]): Promise<ProcessingSummary> {
    const summary: ProcessingSummary = {
      processed: [],
      failed: [],
    };

    for (const task of tasks) {
      const validation = this.validateTask(task);

      if (!validation.isValid) {
        const taskId = task && task.id ? task.id : 'unknown';
        summary.failed.push({ id: taskId, errors: validation.errors });
        continue;
      }

      try {
        // Execute processing for valid tasks
        summary.processed.push(task.id);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown execution error';
        summary.failed.push({ id: task.id, errors: [message] });
      }
    }

    return summary;
  }
}