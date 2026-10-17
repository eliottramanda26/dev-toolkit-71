export interface RetryOptions {
  maxAttempts: number;
  delayMs: number;
}

/**
 * Executes an asynchronous task with linear retry strategy
 */
export async function withRetry<T>(
  task: () => Promise<T>,
  options: RetryOptions = { maxAttempts: 3, delayMs: 1000 }
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= options.maxAttempts; attempt++) {
    try {
      return await task();
    } catch (err) {
      lastError = err;
      
      if (attempt < options.maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, options.delayMs));
      }
    }
  }

  throw lastError;
}

/**
 * Wrapper for network calls using standard fetch
 */
export async function fetchWithRetry(
  url: string,
  init?: RequestInit
): Promise<Response> {
  return withRetry(async () => {
    const response = await fetch(url, init);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  });
}