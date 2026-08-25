// Provides retry logic for unreliable network operations
// Uses exponential backoff with configurable options

export interface NetworkRetryOptions {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
  shouldRetry: (error: Error) => boolean;
}

export const defaultNetworkRetryOptions: NetworkRetryOptions = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 30000,
  shouldRetry: (error: Error) => {
    const message = error.message.toLowerCase();
    return (
      message.includes('timeout') ||
      message.includes('network') ||
      message.includes('connection') ||
      (error as any).code === 'ECONNRESET' ||
      (error as any).code === 'ETIMEDOUT'
    );
  }
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function retryNetworkCall<T>(
  fn: () => Promise<T>,
  options: Partial<NetworkRetryOptions> = {}
): Promise<T> {
  const opts: NetworkRetryOptions = {
    ...defaultNetworkRetryOptions,
    ...options,
  };
  let attempt = 0;
  let lastError: Error | undefined;
  while (attempt <= opts.maxRetries) {
    try {
      return await fn();
    } catch (err) {
      lastError = err as Error;
      attempt++;
      if (attempt > opts.maxRetries || !opts.shouldRetry(lastError)) {
        throw lastError;
      }
      const delay = Math.min(
        opts.baseDelay * Math.pow(2, attempt - 1),
        opts.maxDelay
      );
      await sleep(delay);
    }
  }
  throw lastError!;
}