export interface RetryOptions {
  retries: number;
  delay: number;
}

/**
 * Executes a function with a simple exponential backoff retry mechanism
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = { retries: 3, delay: 1000 }
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= options.retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < options.retries) {
        const backoff = options.delay * Math.pow(2, attempt);
        await new Promise((resolve) => setTimeout(resolve, backoff));
      }
    }
  }

  throw lastError;
}

/**
 * Wrapper to catch network specific errors with retry utility
 */
export const fetchWithRetry = <T>(
  requestFn: () => Promise<T>,
  maxRetries: number = 2
) => {
  return withRetry(requestFn, { retries: maxRetries, delay: 500 });
};