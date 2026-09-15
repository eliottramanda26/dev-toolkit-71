export interface ProcessTask {
  id: string;
  payload: Record<string, unknown>;
  priority: number;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export class TaskProcessorService {
  /**
   * Validates an individual task payload before execution.
   */
  public validateTask(task: ProcessTask): ValidationResult {
    const errors: string[] = [];

    if (!task.id || typeof task.id !== 'string') {
      errors.push('Task ID is required and must be a string.');
    }

    if (!task.payload || typeof task.payload !== 'object' || Array.isArray(task.payload)) {
      errors.push('Task payload must be a non-null object.');
    }

    if (typeof task.priority !== 'number' || task.priority < 1 || task.priority > 5) {
      errors.push('Task priority must be a number between 1 and 5.');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Processes a batch of tasks with input validation in the main loop.
   */
  public processBatch(tasks: ProcessTask[]): { processed: string[]; failed: Array<{ id: string; errors: string[] }> } {
    const processed: string[] = [];
    const failed: Array<{ id: string; errors: string[] }> = [];

    for (const task of tasks) {
      const validation = this.validateTask(task);

      if (!validation.valid) {
        failed.push({
          id: task?.id || 'unknown',
          errors: validation.errors,
        });
        continue;
      }

      processed.push(task.id);
    }

    return { processed, failed };
  }
}
