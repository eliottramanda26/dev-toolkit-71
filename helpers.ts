/**
 * General purpose utility helpers for object manipulation and formatting.
 */

export type Primitive = string | number | boolean | null | undefined;

/**
 * Safely retrieves a nested property from an object using a dot-notation path.
 */
export function getNestedValue<T = unknown>(obj: Record<string, any>, path: string, fallback?: T): T | undefined {
  if (!obj || typeof obj !== 'object') {
    return fallback;
  }
  const keys = path.split('.');
  let current: any = obj;

  for (const key of keys) {
    if (current === null || current === undefined || !(key in current)) {
      return fallback;
    }
    current = current[key];
  }

  return current as T;
}

/**
 * Removes keys with null or undefined values from an object.
 */
export function compactObject<T extends Record<string, any>>(obj: T): Partial<T> {
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value !== null && value !== undefined) {
      result[key] = value;
    }
  }

  return result as Partial<T>;
}

/**
 * Truncates a string to a max length and appends a suffix if trimmed.
 */
export function truncateString(str: string, maxLength: number, suffix = '...'): string {
  if (!str || str.length <= maxLength) {
    return str;
  }
  const adjustedLength = Math.max(0, maxLength - suffix.length);
  return str.slice(0, adjustedLength) + suffix;
}

/**
 * Creates a simple debounced wrapper for a function.
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delayMs: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delayMs);
  };
}