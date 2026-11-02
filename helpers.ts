export type SafeResult<T> = { success: true; data: T } | { success: false; error: Error };

/**
 * Safely executes an async operation with standard error handling
 */
export async function safeExecute<T>(fn: () => Promise<T>): Promise<SafeResult<T>> {
  try {
    const data = await fn();
    return { success: true, data };
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    return { success: false, error };
  }
}

/**
 * Ensures array input is processed safely
 */
export function safeArrayParse<T>(input: unknown, fallback: T[] = []): T[] {
  if (!Array.isArray(input)) {
    return fallback;
  }
  return input as T[];
}

/**
 * Validates object existence before access
 */
export function getNestedProperty<T, K extends keyof T>(obj: T | null | undefined, key: K): T[K] | undefined {
  if (obj === null || obj === undefined || typeof obj !== 'object') {
    return undefined;
  }
  return obj[key];
}