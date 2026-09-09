export interface JobInput {
  id: string;
  type: string;
  payload: Record<string, unknown>;
  priority: number;
}

export interface ProcessingResult {
  jobId: string;
  success: boolean;
  error?: string;
}

export class TaskProcessorService {
  // Validates incoming untrusted job payloads to prevent runtime failures
  private validate(job: any): string | null {
    if (!job || typeof job !== 'object') {
      return 'Job must be a non-null object';
    }
    if (typeof job.id !== 'string' || job.id.trim() === '') {
      return 'Invalid or missing job ID';
    }
    if (typeof job.type !== 'string' || job.type.trim() === '') {
      return 'Invalid or missing job type';
    }
    if (!job.payload || typeof job.payload !== 'object') {
      return 'Invalid or missing job payload';
    }
    if (typeof job.priority !== 'number' || job.priority < 0) {
      return 'Priority must be a non-negative number';
    }
    return null;
  }

  // Main processing loop with safety boundaries and inline validation
  public async processBatch(jobs: unknown[]): Promise<ProcessingResult[]> {
    const results: ProcessingResult[] = [];

    for (const rawJob of jobs) {
      const validationError = this.validate(rawJob);
      
      if (validationError) {
        results.push({
          jobId: (rawJob as any)?.id || 'unknown',
          success: false,
          error: `Validation failed: ${validationError}`,
        });
        continue;
      }

      const job = rawJob as JobInput;

      try {
        await this.executeTask(job);
        results.push({ jobId: job.id, success: true });
      } catch (error) {
        results.push({
          jobId: job.id,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown execution error',
        });
      }
    }

    return results;
  }

  private async executeTask(job: JobInput): Promise<void> {
    if (job.type === 'error-trigger') {
      throw new Error('Simulated workflow execution failure');
    }
    await new Promise((resolve) => setTimeout(resolve, 5));
  }
}