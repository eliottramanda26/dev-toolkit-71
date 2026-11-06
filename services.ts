export interface ProcessingJob {
  id: string;
  payload: unknown;
  priority: number;
}

export const validateJob = (job: unknown): job is ProcessingJob => {
  if (typeof job !== 'object' || job === null) return false;
  const j = job as Record<string, unknown>;
  return (
    typeof j.id === 'string' &&
    typeof j.priority === 'number' &&
    j.payload !== undefined
  );
};

export const processQueue = (jobs: unknown[]): void => {
  for (const rawJob of jobs) {
    // Validate input before processing to prevent runtime errors
    if (!validateJob(rawJob)) {
      console.warn('Skipping invalid job schema detected:', rawJob);
      continue;
    }

    try {
      console.log(`Processing job ${rawJob.id} with priority ${rawJob.priority}`);
      // Additional processing logic here
    } catch (err) {
      console.error(`Execution failed for job ${rawJob.id}:`, err);
    }
  }
};