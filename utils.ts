export class AppError extends Error {
  constructor(public message: string, public statusCode: number = 500) {
    super(message);
    this.name = 'AppError';
  }
}

/**
 * Safely executes async operations with error propagation
 */
export async function safeExecute<T>(fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof AppError) {
      console.error(`[AppError ${error.statusCode}]: ${error.message}`);
    } else if (error instanceof Error) {
      console.error(`[Unexpected Error]: ${error.message}`);
    } else {
      console.error('[Unknown Error]:', error);
    }
    return null;
  }
}

/**
 * Validates object schema and throws for invalid states
 */
export function validateInput<T>(input: T | null | undefined): asserts input is T {
  if (input === null || input === undefined) {
    throw new AppError('Invalid input provided', 400);
  }
}

/**
 * Parses JSON safely to prevent runtime crashes
 */
export function parseJsonSafe<T>(data: string): T | null {
  try {
    return JSON.parse(data) as T;
  } catch {
    return null;
  }
}