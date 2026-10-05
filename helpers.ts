export interface RetryOptions {
  maxAttempts: number;
  delayMs: number;
}

/**
 * Executes a function with exponential backoff retry logic
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = { maxAttempts: 3, delayMs: 1000 }
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= options.maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      if (attempt === options.maxAttempts) break;
      
      // Wait for delay before next attempt
      await new Promise((resolve) => 
        setTimeout(resolve, options.delayMs * attempt)
      );
    }
  }

  throw lastError;
}