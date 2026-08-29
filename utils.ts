// Retry logic for network operations with configurable options

export interface RetryConfig {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
  factor: number;
}

const defaultConfig: RetryConfig = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 10000,
  factor: 2
};

export async function withRetry<T>(
  fn: () => Promise<T>,
  config: Partial<RetryConfig> = {}
): Promise<T> {
  const finalConfig = { ...defaultConfig, ...config };
  let lastError: Error | unknown;

  for (let attempt = 0; attempt <= finalConfig.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (attempt === finalConfig.maxRetries) {
        break;
      }

      const delay = Math.min(
        finalConfig.baseDelay * Math.pow(finalConfig.factor, attempt),
        finalConfig.maxDelay
      );
      
      // Jitter to avoid synchronized retries
      const jitteredDelay = delay * (0.5 + Math.random() * 0.5);
      
      await sleep(jitteredDelay);
    }
  }

  throw lastError;
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Network specific helper
export async function retryFetch(
  url: string | URL | Request,
  init?: RequestInit,
  config?: Partial<RetryConfig>
): Promise<Response> {
  return withRetry(() => fetch(url, init), config);
}