export interface RetryOptions {
  /** Maximum number of retry attempts. Default: 3 */
  maxAttempts?: number;
  /** Initial delay between retries in milliseconds. Default: 1000 */
  delayMs?: number;
  /** Factor to multiply delay by on each attempt. Default: 2 */
  backoffFactor?: number;
  /** Maximum delay allowed between retries in milliseconds. Default: 10000 */
  maxDelayMs?: number;
  /** Optional predicate to decide if an error is retryable */
  shouldRetry?: (error: unknown, attempt: number) => boolean;
}

/**
 * Retries an asynchronous network operation with exponential backoff.
 * 
 * @param operation Function returning a Promise to execute
 * @param options Configuration for retry attempts and backoff timing
 * @returns Result of the successful operation
 */
export async function retryAsync<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    delayMs = 1000,
    backoffFactor = 2,
    maxDelayMs = 10000,
    shouldRetry = () => true,
  } = options;

  let currentDelay = delayMs;
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (attempt === maxAttempts || !shouldRetry(error, attempt)) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, currentDelay));
      currentDelay = Math.min(currentDelay * backoffFactor, maxDelayMs);
    }
  }

  throw lastError;
}