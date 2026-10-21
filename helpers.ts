/**
 * Common helper functions for dev-toolkit-71.
 * Reorganized into clear utility functions with standard type safety.
 */

/**
 * Safely parses a JSON string with a fallback value on failure.
 */
export function safeJsonParse<T>(jsonString: string, fallback: T): T {
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return fallback;
  }
}

/**
 * Creates a new object with specified keys omitted.
 */
export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

/**
 * Creates a new object picking only specified keys.
 */
export function pick<T extends Record<string, any>, K extends keyof T>(
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
 * Pauses execution for a specified duration in milliseconds.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Flattens an array up to specified depth.
 */
export function flattenArray<T>(arr: (T | T[])[], depth = 1): T[] {
  return arr.reduce<T[]>((acc, val) => {
    if (Array.isArray(val) && depth > 0) {
      acc.push(...flattenArray(val, depth - 1));
    } else {
      acc.push(val as T);
    }
    return acc;
  }, []);
}