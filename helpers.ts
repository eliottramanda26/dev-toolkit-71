/**
 * Configuration for the dev-toolkit-71 utility suite.
 */
export interface ToolkitConfig {
  readonly environment: 'development' | 'production';
  readonly debug: boolean;
}

/**
 * Safely parses a JSON string into an object of type T.
 * 
 * @param data - The JSON string to parse
 * @returns The parsed object or null if parsing fails
 */
export function safeParse<T>(data: string): T | null {
  try {
    return JSON.parse(data) as T;
  } catch (err: unknown) {
    console.error('Failed to parse toolkit data', err);
    return null;
  }
}

/**
 * Delays execution for a specified duration in milliseconds.
 * 
 * @param ms - Milliseconds to wait
 * @returns A promise that resolves after the timeout
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Ensures a string value is trimmed and lowercased for normalization.
 * 
 * @param value - Input string
 * @returns Normalized string
 */
export function normalize(value: string): string {
  return value.trim().toLowerCase();
}

/**
 * Validates that a key exists within a specific record object.
 */
export function hasKey<T extends object>(obj: T, key: PropertyKey): key is keyof T {
  return Object.prototype.hasOwnProperty.call(obj, key);
}