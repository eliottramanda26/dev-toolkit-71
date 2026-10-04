export interface RetryOptions {
  retries?: number;
  delay?: number;
  backoffFactor?: number;
  shouldRetry?: (error: any) => boolean;
}

/**
 * Executes an asynchronous task with exponential backoff and error handling for transient failures.
 */
export async function withRetry<T>(
  task: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    retries = 3,
    delay = 1000,
    backoffFactor = 2,
    shouldRetry = () => true,
  } = options;

  let attempt = 0;
  let currentDelay = delay;

  while (attempt <= retries) {
    try {
      return await task();
    } catch (error) {
      attempt++;

      const remainsRetryable = shouldRetry(error);
      const isLastAttempt = attempt > retries;

      if (isLastAttempt || !remainsRetryable) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error(typeof error === 'string' ? error : 'Operation failed during retry execution');
      }

      await new Promise((resolve) => setTimeout(resolve, currentDelay));
      currentDelay *= backoffFactor;
    }
  }

  throw new Error('Retries exhausted without resolution');
}

/**
 * Safely parses a JSON string into a specific type, returning a fallback on malformed structures.
 */
export function safeJsonParse<T>(input: string, fallback: T): T {
  if (!input || typeof input !== 'string') {
    return fallback;
  }
  try {
    return JSON.parse(input) as T;
  } catch {
    return fallback;
  }
}