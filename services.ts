export interface ProcessingJob {
  id: string;
  payload: Record<string, unknown>;
  timestamp: number;
}

export class JobProcessor {
  /** Validates job data structure before processing */
  private isValidJob(job: unknown): job is ProcessingJob {
    if (typeof job !== 'object' || job === null) return false;
    const j = job as any;
    return (
      typeof j.id === 'string' &&
      typeof j.payload === 'object' &&
      typeof j.timestamp === 'number'
    );
  }

  /** Main processing loop for incoming job batches */
  public processBatch(batch: unknown[]): void {
    for (const item of batch) {
      try {
        if (!this.isValidJob(item)) {
          console.warn('Skipping invalid job payload detected');
          continue;
        }

        this.executeJob(item);
      } catch (err) {
        console.error(`Fatal execution error: ${(err as Error).message}`);
      }
    }
  }

  private executeJob(job: ProcessingJob): void {
    console.log(`Processing job ${job.id}`);
  }
}