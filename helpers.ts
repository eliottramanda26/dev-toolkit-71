export interface RetryOptions {
  maxRetries?: number;
  delayMs?: number;
  backoffFactor?: number;
  shouldRetry?: (error: unknown) => boolean;
  onRetry?: (attempt: number, error: unknown) => void;
}

/**
 * Executes an asynchronous function with exponential backoff retry logic.
 */
export async function retryAsync<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    delayMs = 1000,
    backoffFactor = 2,
    shouldRetry = () => true,
    onRetry,
  } = options;

  let currentAttempt = 0;
  let currentDelay = delayMs;

  while (true) {
    try {
      return await fn();
    } catch (error) {
      currentAttempt++;

      if (currentAttempt > maxRetries || !shouldRetry(error)) {
        throw error;
      }

      if (onRetry) {
        onRetry(currentAttempt, error);
      }

      await new Promise((resolve) => setTimeout(resolve, currentDelay));
      currentDelay *= backoffFactor;
    }
  }
}
