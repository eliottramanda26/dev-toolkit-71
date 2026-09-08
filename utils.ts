/**
 * Utility functions for dev-toolkit-71
 */

export interface TaskResult<T> {
  success: boolean;
  data: T | null;
  error: string | null;
}

/**
 * Safely executes a promise and returns a standardized result object
 */
export async function safeExecute<T>(fn: () => Promise<T>): Promise<TaskResult<T>> {
  try {
    const data = await fn();
    return { success: true, data, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown error';
    return { success: false, data: null, error: message };
  }
}

/**
 * Formats a timestamp into a dev-toolkit-71 standard log string
 */
export function formatTimestamp(date: Date = new Date()): string {
  return date.toISOString().replace('T', ' ').substring(0, 19);
}

/**
 * Debounce function to limit execution frequency of callback
 */
export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Type guard to check if a value is a non-null object
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}