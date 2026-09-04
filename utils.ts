export interface RetryOptions {
  maxAttempts: number;
  delayMs: number;
}

/**
 * Executes a function with a simple exponential backoff retry mechanism
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
      
      if (attempt < options.maxAttempts) {
        const backoff = options.delayMs * Math.pow(2, attempt - 1);
        await new Promise((resolve) => setTimeout(resolve, backoff));
      }
    }
  }

  throw lastError;
}