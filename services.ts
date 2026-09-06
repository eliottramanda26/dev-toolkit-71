interface RetryOptions {
  attempts: number;
  delay: number;
}

/**
 * Executes a function with exponential backoff retry logic
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = { attempts: 3, delay: 1000 }
): Promise<T> {
  let lastError: unknown;

  for (let i = 0; i < options.attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i < options.attempts - 1) {
        await new Promise((resolve) => setTimeout(resolve, options.delay * Math.pow(2, i)));
      }
    }
  }

  throw lastError;
}

export const fetchWithTimeout = async (url: string, timeout: number = 5000): Promise<Response> => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
};