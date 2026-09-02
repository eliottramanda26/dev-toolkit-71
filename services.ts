// services.ts - Network services with retry logic

interface RetryConfig {
  maxRetries: number;
  baseDelay: number;
}

/**
 * Retries a network operation with exponential backoff
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  config: RetryConfig = { maxRetries: 3, baseDelay: 1000 }
): Promise<T> {
  let attempt = 0;
  let lastError: Error | undefined;

  while (attempt <= config.maxRetries) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      attempt++;
      if (attempt > config.maxRetries) {
        break;
      }
      const delay = config.baseDelay * Math.pow(2, attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError ?? new Error('Operation failed after all retries');
}

// Convenience function for fetch operations
export async function fetchWithRetry(
  input: RequestInfo | URL,
  init?: RequestInit,
  config?: RetryConfig
): Promise<Response> {
  return withRetry(async () => {
    const res = await fetch(input, init);
    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.status}`);
    }
    return res;
  }, config);
}