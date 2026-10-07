interface ProcessTask {
  id: string;
  payload: string;
  priority: 'low' | 'medium' | 'high';
  timestamp: number;
}

interface ProcessResult {
  id: string;
  success: boolean;
  error?: string;
}

export class TaskProcessingService {
  /**
   * Validates incoming tasks to ensure they adhere to the ProcessTask schema
   */
  public isValidTask(task: unknown): task is ProcessTask {
    if (!task || typeof task !== 'object') {
      return false;
    }

    const t = task as Record<string, unknown>;

    return (
      typeof t.id === 'string' &&
      t.id.trim() !== '' &&
      typeof t.payload === 'string' &&
      typeof t.timestamp === 'number' &&
      t.timestamp > 0 &&
      (t.priority === 'low' || t.priority === 'medium' || t.priority === 'high')
    );
  }

  /**
   * Processes a batch of tasks, incorporating robust input validation
   */
  public processBatch(rawTasks: unknown[]): ProcessResult[] {
    const results: ProcessResult[] = [];

    for (const rawTask of rawTasks) {
      if (!this.isValidTask(rawTask)) {
        const fallbackId = (rawTask && typeof rawTask === 'object' && 'id' in rawTask) 
          ? String((rawTask as any).id) 
          : 'malformed-task';
        
        results.push({
          id: fallbackId,
          success: false,
          error: 'Validation failed: Invalid task structure or field values'
        });
        continue;
      }

      try {
        // Safe to operate on validated task
        if (rawTask.payload.length === 0) {
          throw new Error('Payload contains empty data');
        }

        results.push({
          id: rawTask.id,
          success: true
        });
      } catch (err) {
        results.push({
          id: rawTask.id,
          success: false,
          error: err instanceof Error ? err.message : 'Processing error'
        });
      }
    }

    return results;
  }
}