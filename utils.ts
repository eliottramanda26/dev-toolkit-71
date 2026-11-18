export interface RetryOptions {
  maxAttempts: number;
  delayMs: number;
}

/**
 * Retries an asynchronous operation with a fixed delay between attempts
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = { maxAttempts: 3, delayMs: 1000 }
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= options.maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (err) {
      lastError = err;

      if (attempt === options.maxAttempts) {
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, options.delayMs));
    }
  }

  throw lastError;
}