/**
 * dev-toolkit-71 helper utilities
 */

export interface TaskResult<T> {
  success: boolean;
  data: T | null;
  error?: string;
}

/**
 * Safely parses JSON strings with error handling
 */
export function safeParse<T>(json: string): TaskResult<T> {
  try {
    const parsed = JSON.parse(json) as T;
    return { success: true, data: parsed };
  } catch (err) {
    return { success: false, data: null, error: 'invalid json format' };
  }
}

/**
 * Normalizes string inputs for toolkit consistency
 */
export const normalizeKey = (key: string): string => {
  return key.trim().toLowerCase().replace(/\s+/g, '_');
};

/**
 * Batch processes arrays to prevent stack overflow
 */
export function processChunks<T, R>(items: T[], chunkSize: number, callback: (chunk: T[]) => R[]): R[] {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    results.push(...callback(chunk));
  }
  return results;
}