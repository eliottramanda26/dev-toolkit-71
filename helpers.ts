/**
 * Utility functions for object manipulation and asynchronous retry workflows.
 * @module helpers
 */

/**
 * Creates a deep clone of a serializable object or value.
 *
 * @template T The type of the object being cloned.
 * @param obj - The target value or object to duplicate.
 * @returns A deep-copied instance of the input object.
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }
  if (Array.isArray(obj)) {
    return obj.map((item: unknown) => deepClone(item)) as unknown as T;
  }
  const cloned = {} as Record<string, unknown>;
  for (const key of Object.keys(obj as object)) {
    cloned[key] = deepClone((obj as Record<string, unknown>)[key]);
  }
  return cloned as T;
}

/**
 * Constructs a new object composed of the picked property keys.
 *
 * @template T The source object type.
 * @template K The property key types.
 * @param obj - Source object to extract properties from.
 * @param keys - Array of property keys to include.
 * @returns Subset object containing only the specified keys.
 */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Retries an asynchronous function until it succeeds or reaches maximum attempts.
 *
 * @template T The expected return type of the task.
 * @param task - Async task returning a promise.
 * @param maxAttempts - Maximum number of retry attempts (default: 3).
 * @param delayMs - Backoff delay between attempts in milliseconds (default: 150).
 * @returns Resolution value of the async task.
 */
export async function retryTask<T>(
  task: () => Promise<T>,
  maxAttempts: number = 3,
  delayMs: number = 150
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await task();
    } catch (err: unknown) {
      lastError = err;
      if (attempt < maxAttempts && delayMs > 0) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }
  throw lastError;
}