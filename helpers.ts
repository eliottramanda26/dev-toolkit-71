/**
 * Utility options for object operations.
 */
export interface FormatOptions {
  /** Whether to strip special characters from the result. */
  stripSpecial?: boolean;
  /** Custom fallback value if input is empty or invalid. */
  fallback?: string;
}

/**
 * Safely parses a JSON string into a strongly-typed object without throwing.
 *
 * @template T The expected return type.
 * @param jsonString - The raw JSON string to parse.
 * @param fallback - The fallback value if parsing fails.
 * @returns The parsed object or fallback value.
 */
export function safeJsonParse<T>(jsonString: string, fallback: T): T {
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return fallback;
  }
}

/**
 * Truncates a string to a specified length and appends a custom suffix.
 *
 * @param str - The input string to truncate.
 * @param maxLength - Maximum allowed length including suffix.
 * @param suffix - Suffix to append when truncated (defaults to '...').
 * @returns The truncated or original string.
 */
export function truncate(
  str: string,
  maxLength: number,
  suffix: string = '...'
): string {
  if (str.length <= maxLength) {
    return str;
  }
  const effectiveLength = Math.max(0, maxLength - suffix.length);
  return str.slice(0, effectiveLength) + suffix;
}

/**
 * Delays execution for a given number of milliseconds.
 *
 * @param ms - Duration to sleep in milliseconds.
 * @returns A promise that resolves after the specified duration.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Creates a debounced version of a function that delays execution.
 *
 * @template T Function signature extending generic function type.
 * @param fn - The target function to debounce.
 * @param delayMs - Delay duration in milliseconds.
 * @returns A debounced wrapper function.
 */
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delayMs: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>): void => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delayMs);
  };
}