export interface JobInput {
  id: string;
  payload: string;
  retries: number;
}

export interface ProcessResult {
  successful: string[];
  failed: Array<{ id: string; error: string }>;
}

export class JobProcessingService {
  /**
   * Validates a single JobInput object.
   * Returns an error message string if invalid, or null if valid.
   */
  private validate(job: JobInput): string | null {
    if (!job || typeof job !== 'object') {
      return 'Job record is empty or invalid';
    }
    if (!job.id || typeof job.id !== 'string' || job.id.trim() === '') {
      return 'Invalid or missing job ID';
    }
    if (typeof job.payload !== 'string') {
      return 'Payload must be a string';
    }
    if (typeof job.retries !== 'number' || job.retries < 0) {
      return 'Retries must be a non-negative number';
    }
    return null;
  }

  /**
   * Main processing loop with input validation.
   */
  public processBatch(jobs: JobInput[]): ProcessResult {
    const result: ProcessResult = {
      successful: [],
      failed: [],
    };

    if (!Array.isArray(jobs)) {
      throw new Error('Input must be an array of jobs');
    }

    for (const job of jobs) {
      const validationError = this.validate(job);
      if (validationError) {
        result.failed.push({
          id: job?.id || 'unknown',
          error: `Validation failed: ${validationError}`,
        });
        continue;
      }

      try {
        this.executeJob(job);
        result.successful.push(job.id);
      } catch (error: any) {
        result.failed.push({
          id: job.id,
          error: error?.message || 'Unknown processing error',
        });
      }
    }

    return result;
  }

  private executeJob(job: JobInput): void {
    if (job.payload.includes('fail-execution')) {
      throw new Error('Simulation of execution failure');
    }
  }
}