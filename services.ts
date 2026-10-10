export interface RetryOptions {
  maxRetries: number;
  delayMs: number;
  backoffFactor: number;
  onRetry?: (attempt: number, error: Error) => void;
}

const DEFAULT_OPTIONS: RetryOptions = {
  maxRetries: 3,
  delayMs: 1000,
  backoffFactor: 2,
};

/**
 * Executes an async network operation with exponential backoff retry logic.
 */
export async function retryOperation<T>(
  operation: () => Promise<T>,
  options: Partial<RetryOptions> = {}
): Promise<T> {
  const config: RetryOptions = { ...DEFAULT_OPTIONS, ...options };
  let currentDelay = config.delayMs;

  for (let attempt = 1; attempt <= config.maxRetries + 1; attempt++) {
    try {
      return await operation();
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));

      if (attempt > config.maxRetries) {
        throw new Error(`Operation failed after ${config.maxRetries} retries: ${err.message}`);
      }

      if (config.onRetry) {
        config.onRetry(attempt, err);
      }

      await new Promise((resolve) => setTimeout(resolve, currentDelay));
      currentDelay *= config.backoffFactor;
    }
  }

  throw new Error('Unexpected end of retry loop');
}

/**
 * Wrapper around fetch that retries on server errors (5xx) or network failures.
 */
export async function fetchWithRetry(
  url: string,
  init?: RequestInit,
  retryOptions?: Partial<RetryOptions>
): Promise<Response> {
  return retryOperation(async () => {
    const response = await fetch(url, init);
    // Re-throw for 5xx errors to trigger retry
    if (!response.ok && response.status >= 500) {
      throw new Error(`Server returned HTTP status ${response.status}`);
    }
    return response;
  }, retryOptions);
}