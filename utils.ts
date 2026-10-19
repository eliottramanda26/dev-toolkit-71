export type Result<T, E = Error> = { success: true; data: T } | { success: false; error: E };

/**
 * Safely executes a function and captures potential exceptions
 */
export function safeExecute<T>(fn: () => T): Result<T> {
  try {
    return { success: true, data: fn() };
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    return { success: false, error: err };
  }
}

/**
 * Async variant for promise-based operations
 */
export async function safeExecuteAsync<T>(promise: Promise<T>): Promise<Result<T>> {
  try {
    const data = await promise;
    return { success: true, data };
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    return { success: false, error: err };
  }
}

/**
 * Type guard to validate inputs against null or undefined
 */
export function assertDefined<T>(value: T | null | undefined, message: string): T {
  if (value === null || value === undefined) {
    throw new Error(message);
  }
  return value;
}