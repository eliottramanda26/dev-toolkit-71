export interface Task {
  id: string;
  type: string;
  payload: Record<string, unknown>;
  retries?: number;
}

export interface ProcessingResult {
  taskId: string;
  success: boolean;
  error?: string;
}

export class TaskProcessor {
  // Validates a raw input task, returning a list of validation error messages
  private validateTask(task: any): string[] {
    const errors: string[] = [];
    if (!task || typeof task !== 'object') {
      errors.push('Task must be a non-null object');
      return errors;
    }
    if (typeof task.id !== 'string' || task.id.trim() === '') {
      errors.push('Invalid or missing task ID');
    }
    if (typeof task.type !== 'string' || task.type.trim() === '') {
      errors.push('Invalid or missing task type');
    }
    if (!task.payload || typeof task.payload !== 'object') {
      errors.push('Invalid or missing task payload');
    }
    return errors;
  }

  // Processes a batch of raw input tasks with strict validation
  public async processBatch(tasks: unknown[]): Promise<ProcessingResult[]> {
    const results: ProcessingResult[] = [];

    for (const rawTask of tasks) {
      const validationErrors = this.validateTask(rawTask);
      
      if (validationErrors.length > 0) {
        const fallbackId = (rawTask as any)?.id || 'unknown';
        results.push({
          taskId: String(fallbackId),
          success: false,
          error: `Validation failed: ${validationErrors.join(', ')}`,
        });
        continue;
      }

      const task = rawTask as Task;
      try {
        await this.executeTask(task);
        results.push({ taskId: task.id, success: true });
      } catch (err: any) {
        results.push({
          taskId: task.id,
          success: false,
          error: err?.message || 'Processing execution failed',
        });
      }
    }

    return results;
  }

  private async executeTask(task: Task): Promise<void> {
    // Simulate task processing work
    if (task.type === 'fail') {
      throw new Error('Simulation trigger forced processing failure');
    }
  }
}