export interface RetryOptions {
  retries?: number;
  delayMs?: number;
  backoffFactor?: number;
  maxDelayMs?: number;
  shouldRetry?: (error: unknown) => boolean;
}

/**
 * Executes an async operation with exponential backoff retry logic.
 * Useful for transient network failures and resilient API calls.
 */
export async function retryNetworkOp<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    retries = 3,
    delayMs = 1000,
    backoffFactor = 2,
    maxDelayMs = 10000,
    shouldRetry = () => true,
  } = options;

  let currentDelay = delayMs;
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (attempt === retries || !shouldRetry(error)) {
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, currentDelay));
      currentDelay = Math.min(currentDelay * backoffFactor, maxDelayMs);
    }
  }

  throw lastError;
}
