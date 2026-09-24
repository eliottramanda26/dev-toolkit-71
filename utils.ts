/**
 * Configuration constants for the toolkit
 */
export const DEFAULT_TIMEOUT: number = 5000;

/**
 * Formats a given string input into a standard lowercase slug
 * @param input - The raw string to slugify
 * @returns The formatted string
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Deeply checks if an object is empty
 * @param obj - The object to evaluate
 * @returns Boolean result of emptiness check
 */
export function isEmpty(obj: Record<string, unknown>): boolean {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

/**
 * Pauses execution for a set duration
 * @param ms - Milliseconds to wait
 * @returns Promise that resolves after timeout
 */
export function delay(ms: number = DEFAULT_TIMEOUT): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Validates environment variables presence
 * @param keys - Array of keys to verify
 */
export function validateEnv(keys: string[]): void {
  keys.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing environment variable: ${key}`);
    }
  });
}