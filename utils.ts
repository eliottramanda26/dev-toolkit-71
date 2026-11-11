export interface RetryOptions {
  maxRetries?: number;
  delayMs?: number;
  backoffFactor?: number;
  shouldRetry?: (error: unknown) => boolean;
}

/**
 * Executes an asynchronous task with configurable retry logic and exponential backoff.
 */
export async function retryOperation<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    delayMs = 500,
    backoffFactor = 2,
    shouldRetry = () => true,
  } = options;

  let attempt = 0;
  let currentDelay = delayMs;

  while (true) {
    try {
      attempt++;
      return await operation();
    } catch (error) {
      const isLastAttempt = attempt > maxRetries;
      const canRetry = shouldRetry(error);

      if (isLastAttempt || !canRetry) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, currentDelay));
      currentDelay *= backoffFactor;
    }
  }
}
