/**
 * Utility helper functions for general data manipulation and validation.
 */

/**
 * Truncates a string to a specified length and appends a suffix if trimmed.
 */
export function truncate(str: string, maxLength: number, suffix = '...'): string {
  if (str.length <= maxLength) return str;
  const effectiveLength = Math.max(0, maxLength - suffix.length);
  return str.slice(0, effectiveLength) + suffix;
}

/**
 * Splits an array into smaller chunks of a specified maximum size.
 */
export function chunk<T>(items: T[], size: number): T[][] {
  if (size <= 0) throw new Error('Chunk size must be greater than 0');
  const result: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size));
  }
  return result;
}

/**
 * Removes null and undefined values from an object.
 */
export function compactObject<T extends Record<string, unknown>>(obj: T): Partial<T> {
  const cleaned: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== null && value !== undefined) {
      cleaned[key] = value;
    }
  }
  return cleaned as Partial<T>;
}

/**
 * Type guard to filter out null and undefined values in array methods.
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Safely parses JSON with a default fallback if parsing fails.
 */
export function safeJsonParse<T>(jsonString: string, fallback: T): T {
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return fallback;
  }
}
