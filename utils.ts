export interface RetryOptions {
  maxAttempts: number;
  delayMs: number;
}

/**
 * Retries an asynchronous operation with a linear backoff.
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
        await new Promise((resolve) => setTimeout(resolve, options.delayMs));
      }
    }
  }

  throw lastError instanceof Error 
    ? lastError 
    : new Error(`Operation failed after ${options.maxAttempts} attempts: ${String(lastError)}`);
}

/**
 * Checks if an error appears to be network-related.
 */
export function isNetworkError(err: unknown): boolean {
  return err instanceof TypeError && err.message.includes('fetch');
}