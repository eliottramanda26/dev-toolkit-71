export interface Job {
  id: string;
  type: 'transform' | 'analyze' | 'archive';
  payload: Record<string, unknown>;
}

export interface ProcessingResult {
  successful: string[];
  failed: { id: string; reason: string }[];
}

export class JobProcessor {
  /**
   * Validates a job object to ensure it has all required properties and correct types.
   */
  private validateJob(job: any): string | null {
    if (!job || typeof job !== 'object') {
      return 'Job must be a non-null object';
    }
    if (typeof job.id !== 'string' || job.id.trim() === '') {
      return 'Invalid or missing job ID';
    }
    const allowedTypes = ['transform', 'analyze', 'archive'];
    if (!allowedTypes.includes(job.type)) {
      return `Invalid job type. Expected one of: ${allowedTypes.join(', ')}`;
    }
    if (!job.payload || typeof job.payload !== 'object') {
      return 'Job payload must be an object';
    }
    return null;
  }

  /**
   * Processes a batch of jobs, validating each one before execution.
   */
  public processBatch(jobs: unknown[]): ProcessingResult {
    const successful: string[] = [];
    const failed: { id: string; reason: string }[] = [];

    if (!Array.isArray(jobs)) {
      throw new Error('Input batch must be an array of jobs');
    }

    for (let i = 0; i < jobs.length; i++) {
      const jobCandidate = jobs[i];
      const validationError = this.validateJob(jobCandidate);

      if (validationError) {
        const fallbackId = (jobCandidate && typeof jobCandidate === 'object' && 'id' in jobCandidate) 
          ? String((jobCandidate as any).id) 
          : `index-${i}`;
        
        failed.push({
          id: fallbackId,
          reason: validationError,
        });
        continue;
      }

      const job = jobCandidate as Job;

      try {
        this.executeJob(job);
        successful.push(job.id);
      } catch (error) {
        failed.push({
          id: job.id,
          reason: error instanceof Error ? error.message : 'Unknown processing error',
        });
      }
    }

    return { successful, failed };
  }

  private executeJob(job: Job): void {
    if (job.type === 'analyze' && !job.payload.metrics) {
      throw new Error("Missing 'metrics' key in analyze payload");
    }
  }
}