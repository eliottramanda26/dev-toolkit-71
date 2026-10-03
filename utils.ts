export interface RetryOptions {
  retries?: number;
  delay?: number;
  factor?: number;
  backoff?: boolean;
}

/**
 * Executes an asynchronous operation with retry logic and exponential backoff.
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const { retries = 3, delay = 1000, factor = 2, backoff = true } = options;
  let attempt = 0;

  while (true) {
    try {
      return await fn();
    } catch (error) {
      attempt++;
      if (attempt >= retries) {
        throw error;
      }
      const sleepTime = backoff ? delay * Math.pow(factor, attempt - 1) : delay;
      await new Promise((resolve) => setTimeout(resolve, sleepTime));
    }
  }
}