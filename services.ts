export interface ProcessingTask {
  id: string;
  payload: Record<string, unknown>;
  priority?: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class TaskProcessingService {
  private validateTask(task: unknown): ValidationResult {
    const errors: string[] = [];
    if (!task || typeof task !== 'object') {
      return { isValid: false, errors: ['Task must be a non-null object'] };
    }

    const t = task as Partial<ProcessingTask>;
    if (!t.id || typeof t.id !== 'string' || t.id.trim() === '') {
      errors.push('Task missing valid string id');
    }
    if (!t.payload || typeof t.payload !== 'object') {
      errors.push('Task payload must be an object');
    }
    if (t.priority !== undefined && (typeof t.priority !== 'number' || t.priority < 0)) {
      errors.push('Task priority must be a non-negative number');
    }

    return { isValid: errors.length === 0, errors };
  }

  public async processBatch(rawTasks: unknown[]): Promise<{ processed: string[]; skipped: number }> {
    const processed: string[] = [];
    let skipped = 0;

    for (const rawTask of rawTasks) {
      // Validate incoming raw input inside the processing loop
      const validation = this.validateTask(rawTask);
      if (!validation.isValid) {
        console.warn(`[TaskProcessor] Skipping task: ${validation.errors.join('; ')}`);
        skipped++;
        continue;
      }

      const task = rawTask as ProcessingTask;
      // Perform processing logic on sanitized and validated item
      processed.push(task.id);
    }

    return { processed, skipped };
  }
}