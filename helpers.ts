export class AppError extends Error {
  constructor(public message: string, public statusCode: number = 500) {
    super(message);
    this.name = 'AppError';
  }
}

/**
 * Safely executes async operations with error categorization
 */
export async function safeExecute<T>(fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn();
  } catch (error: unknown) {
    if (error instanceof AppError) {
      console.error(`[AppError ${error.statusCode}]: ${error.message}`);
    } else if (error instanceof Error) {
      console.error(`[Internal Error]: ${error.message}`);
    } else {
      console.error('[Unknown Error]: An unexpected issue occurred');
    }
    return null;
  }
}

/**
 * Type guard to validate input data presence
 */
export function ensureNotNull<T>(input: T | null | undefined, name: string): T {
  if (input === null || input === undefined) {
    throw new AppError(`Missing required dependency: ${name}`, 400);
  }
  return input;
}