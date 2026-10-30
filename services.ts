export interface ProcessingJob {
  id: string;
  payload: unknown;
  timestamp: number;
}

export class JobProcessor {
  /**
   * Validates job structure before processing
   */
  private isValid(job: unknown): job is ProcessingJob {
    if (typeof job !== 'object' || job === null) return false;
    const j = job as Record<string, unknown>;
    return (
      typeof j.id === 'string' &&
      typeof j.timestamp === 'number' &&
      j.payload !== undefined
    );
  }

  /**
   * Main loop for queue processing with validation
   */
  public async processQueue(jobs: unknown[]): Promise<void> {
    for (const job of jobs) {
      if (!this.isValid(job)) {
        console.error('Invalid job schema detected', job);
        continue;
      }

      try {
        await this.handleJob(job);
      } catch (err) {
        console.error(`Failed to process job ${job.id}:`, err);
      }
    }
  }

  private async handleJob(job: ProcessingJob): Promise<void> {
    // Business logic implementation
    console.log(`Processing job: ${job.id}`);
  }
}