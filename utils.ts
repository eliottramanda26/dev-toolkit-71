export interface RetryOptions {
  retries?: number;
  delay?: number;
  factor?: number;
  shouldRetry?: (error: any) => boolean;
}

/**
 * Executes an asynchronous network operation and retries it upon failure.
 * Supports custom retry counts, backoff factors, and conditional checks.
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    retries = 3,
    delay = 1000,
    factor = 2,
    shouldRetry = () => true,
  } = options;

  let currentDelay = delay;

  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    try {
      return await fn();
    } catch (error) {
      const isLastAttempt = attempt > retries;
      const allowsRetry = shouldRetry(error);

      if (isLastAttempt || !allowsRetry) {
        throw error;
      }

      // Delay next attempt using exponential backoff
      await new Promise((resolve) => setTimeout(resolve, currentDelay));
      currentDelay *= factor;
    }
  }

  throw new Error("Retry helper exited unexpectedly");
}