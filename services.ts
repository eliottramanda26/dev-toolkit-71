export class ServiceError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'ServiceError';
  }
}

export interface RequestOptions {
  timeoutMs?: number;
  maxRetries?: number;
}

/**
 * Executes a resilient HTTP fetch with timeout and retry logic for edge cases.
 */
export async function fetchWithRetry<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { timeoutMs = 3000, maxRetries = 2 } = options;

  if (!url || typeof url !== 'string' || !/^https?:\/\//i.test(url)) {
    throw new ServiceError('Invalid target URL provided', 'ERR_INVALID_URL', { url });
  }

  let attempt = 0;
  let lastError: ServiceError | null = null;

  while (attempt <= maxRetries) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new ServiceError(`Request failed with status ${response.status}`, 'ERR_HTTP_STATUS', {
          status: response.status,
        });
      }

      const text = await response.text();
      if (!text.trim()) {
        throw new ServiceError('Received empty payload from server', 'ERR_EMPTY_RESPONSE');
      }

      return JSON.parse(text) as T;
    } catch (err: unknown) {
      clearTimeout(timeoutId);

      if (err instanceof ServiceError) {
        lastError = err;
      } else if (err instanceof Error && err.name === 'AbortError') {
        lastError = new ServiceError(`Operation timed out after ${timeoutMs}ms`, 'ERR_TIMEOUT');
      } else {
        const msg = err instanceof Error ? err.message : 'Unknown network failure';
        lastError = new ServiceError(msg, 'ERR_NETWORK', err);
      }

      // Stop retrying on client errors or empty responses
      if (lastError.code === 'ERR_HTTP_STATUS' || lastError.code === 'ERR_EMPTY_RESPONSE') {
        break;
      }

      attempt++;
    }
  }

  throw lastError || new ServiceError('Service execution failed', 'ERR_UNKNOWN');
}