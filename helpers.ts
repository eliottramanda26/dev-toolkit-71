/**
 * Configuration constants for dev-toolkit-71
 */
export const DEFAULT_TIMEOUT_MS = 5000;

/**
 * Formats a string to be URL friendly
 * @param input raw input string
 * @returns slugified string
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Generic delay utility for async flows
 * @param ms milliseconds to wait
 * @returns promise resolving after timeout
 */
export function delay(ms: number = DEFAULT_TIMEOUT_MS): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Safely parses JSON with optional fallback
 * @param data json string
 * @param fallback value to return on failure
 * @returns parsed object or fallback
 */
export function safeJsonParse<T>(data: string, fallback: T): T {
  try {
    return JSON.parse(data) as T;
  } catch {
    return fallback;
  }
}

/**
 * Validates if the object is empty
 * @param obj object to check
 * @returns boolean indication
 */
export function isEmpty(obj: Record<string, unknown>): boolean {
  return Object.keys(obj).length === 0;
}