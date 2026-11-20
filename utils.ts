/**
 * Formats a string to PascalCase for component naming
 * @param input - The raw string input
 * @returns The PascalCase formatted string
 */
export const toPascalCase = (input: string): string => {
  return input
    .replace(/(\w)(\w*)/g, (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase())
    .replace(/[^a-zA-Z0-9]/g, '');
};

/**
 * Safely parses a JSON string with a fallback value
 * @param jsonString - The raw string to parse
 * @param fallback - The default value if parsing fails
 * @returns The parsed object or fallback
 */
export function safeParse<T>(jsonString: string, fallback: T): T {
  try {
    return JSON.parse(jsonString) as T;
  } catch (err) {
    return fallback;
  }
}

/**
 * Configuration for retry operations
 */
export interface RetryOptions {
  attempts: number;
  delayMs: number;
}

/**
 * Executes a function with simple retry logic
 * @param fn - The function to execute
 * @param options - Attempt and delay configuration
 */
export async function withRetry<T>(fn: () => Promise<T>, options: RetryOptions): Promise<T> {
  let lastError: unknown;

  for (let i = 0; i < options.attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i < options.attempts - 1) {
        await new Promise((res) => setTimeout(res, options.delayMs));
      }
    }
  }

  throw lastError;
}