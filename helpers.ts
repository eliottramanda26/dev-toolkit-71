export interface RetryOptions {
  retries: number;
  delayMs: number;
}

/**
 * Executes a network operation with exponential backoff support
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = { retries: 3, delayMs: 1000 }
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= options.retries; attempt++) {
    try {
      return await operation();
    } catch (err) {
      lastError = err;
      if (attempt === options.retries) break;

      const backoff = options.delayMs * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, backoff));
    }
  }

  throw lastError;
}