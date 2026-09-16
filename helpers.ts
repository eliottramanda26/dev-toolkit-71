export interface RetryOptions {
  maxAttempts: number;
  delayMs: number;
}

/**
 * Executes a function with exponential backoff retry logic
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = { maxAttempts: 3, delayMs: 1000 }
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= options.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt < options.maxAttempts) {
        const delay = options.delayMs * Math.pow(2, attempt - 1);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

export const delay = (ms: number): Promise<void> => 
  new Promise((resolve) => setTimeout(resolve, ms));