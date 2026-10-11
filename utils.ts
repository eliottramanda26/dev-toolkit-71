export interface TaskResult<T> {
  data: T | null;
  error: Error | null;
}

/**
 * Safely executes a promise and returns a standardized object.
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
 * Delays execution for a specified duration in milliseconds.
 */
export const sleep = (ms: number): Promise<void> => 
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Memoizes an object into a deep frozen configuration state.
 */
export function freezeConfig<T extends object>(config: T): Readonly<T> {
  return Object.freeze({ ...config });
}

/**
 * Normalizes string inputs for consistent key matching.
 */
export function formatKey(key: string): string {
  return key.trim().toLowerCase().replace(/\s+/g, '_');
}