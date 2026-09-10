export class AppError extends Error {
  constructor(public message: string, public statusCode: number = 500) {
    super(message);
    this.name = 'AppError';
  }
}

/**
 * Safely executes a promise with provided fallback value
 */
export async function safeExecute<T>(
  fn: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    console.error('[dev-toolkit-71] execution error:', error);
    return fallback;
  }
}

/**
 * Validates object schema presence
 */
export function validateInput<T>(input: T | null | undefined): T {
  if (input === null || input === undefined) {
    throw new AppError('Invalid input provided', 400);
  }
  return input;
}

/**
 * Utility for retrying operations with simple backoff
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  retries: number = 3
): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}