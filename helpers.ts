/**
 * Configuration constants for dev-toolkit-71 operations
 */
export const DEFAULT_TIMEOUT_MS = 5000;

export interface TaskResult<T> {
  success: boolean;
  data: T | null;
  error?: string;
}

/**
 * Formats a given string into a consistent development identifier
 * @param input The raw string to normalize
 * @returns The normalized identifier in kebab-case
 */
export function formatIdentifier(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-');
}

/**
 * Safely parses a JSON string with type enforcement
 * @param json The JSON string to parse
 * @returns A TaskResult containing the parsed object or error details
 */
export function safeParse<T>(json: string): TaskResult<T> {
  try {
    const data: T = JSON.parse(json);
    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      data: null,
      error: err instanceof Error ? err.message : 'Unknown parsing error'
    };
  }
}

/**
 * Delays execution by the specified milliseconds
 * @param ms Duration in milliseconds
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};