interface RetryOptions {
  attempts: number;
  delay: number;
}

/**
 * executes an asynchronous task with exponential backoff
 */
export async function withRetry<T>(
  task: () => Promise<T>,
  options: RetryOptions = { attempts: 3, delay: 1000 }
): Promise<T> {
  let lastError: unknown;

  for (let i = 0; i < options.attempts; i++) {
    try {
      return await task();
    } catch (error) {
      lastError = error;
      if (i < options.attempts - 1) {
        await new Promise((resolve) => setTimeout(resolve, options.delay * Math.pow(2, i)));
      }
    }
  }

  throw lastError;
}

export const fetchWithRetry = async <T>(url: string, init?: RequestInit): Promise<T> => {
  return withRetry(async () => {
    const response = await fetch(url, init);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  });
};