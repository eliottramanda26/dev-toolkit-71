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
    if (error instanceof Error) {
      console.error(`[dev-toolkit-71] Error: ${error.message}`);
      if (error instanceof AppError && error.statusCode === 404) {
        return null;
      }
    }
    throw new Error('Critical failure in operation');
  }
}

/**
 * Validates object schema for edge cases
 */
export function validatePayload(data: unknown): asserts data is Record<string, unknown> {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new AppError('Invalid payload structure', 400);
  }
}