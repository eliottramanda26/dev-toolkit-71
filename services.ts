export interface TaskInput {
  id: string;
  name: string;
  priority: 'low' | 'medium' | 'high';
  payload: Record<string, unknown>;
}

export interface ProcessResult {
  successful: string[];
  failed: { id: string; error: string }[];
}

export function validateInput(input: any): string[] {
  const errors: string[] = [];
  if (!input || typeof input !== 'object') {
    return ['Input must be a valid object'];
  }
  if (typeof input.id !== 'string' || input.id.trim() === '') {
    errors.push('id must be a non-empty string');
  }
  if (typeof input.name !== 'string' || input.name.trim() === '') {
    errors.push('name must be a non-empty string');
  }
  const validPriorities = ['low', 'medium', 'high'];
  if (!validPriorities.includes(input.priority)) {
    errors.push(`priority must be one of: ${validPriorities.join(', ')}`);
  }
  if (!input.payload || typeof input.payload !== 'object') {
    errors.push('payload must be an object');
  }
  return errors;
}

export function processBatch(inputs: unknown[]): ProcessResult {
  const successful: string[] = [];
  const failed: { id: string; error: string }[] = [];

  for (let i = 0; i < inputs.length; i++) {
    const rawInput = inputs[i];
    const errors = validateInput(rawInput);
    const identifier = (rawInput && typeof rawInput === 'object' && 'id' in rawInput) 
      ? String((rawInput as any).id) 
      : `index_${i}`;

    if (errors.length > 0) {
      failed.push({
        id: identifier,
        error: `Validation failed: ${errors.join('; ')}` 
      });
      continue;
    }

    try {
      const task = rawInput as TaskInput;
      if (task.priority === 'high' && Object.keys(task.payload).length === 0) {
        throw new Error('High priority task payload cannot be empty');
      }
      successful.push(task.id);
    } catch (err) {
      failed.push({
        id: identifier,
        error: err instanceof Error ? err.message : 'Unknown processing error'
      });
    }
  }

  return { successful, failed };
}