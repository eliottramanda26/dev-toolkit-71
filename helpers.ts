export interface TaskResult<T> {
  data: T | null;
  error: Error | null;
}

/**
 * Safely executes an asynchronous operation with error encapsulation
 */
export async function safeExecute<T>(fn: () => Promise<T>): Promise<TaskResult<T>> {
  try {
    const data = await fn();
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err instanceof Error ? err : new Error(String(err)) };
  }
}

/**
 * Normalizes string input to handle nullish values
 */
export const formatString = (input: unknown): string => {
  if (typeof input === 'string') return input.trim();
  if (input === null || input === undefined) return '';
  return String(input);
};

/**
 * Pauses execution for a specified duration in milliseconds
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Validates object schema structure presence
 */
export const isNotEmpty = (obj: Record<string, any>): boolean => {
  return Object.keys(obj).length > 0;
};