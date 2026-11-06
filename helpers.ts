/**
 * Utility functions for dev-toolkit-71 data management
 */

export type Nullable<T> = T | null | undefined;

/**
 * Safely deep clones a plain object using structuredClone
 */
export function cloneData<T>(data: T): T {
  return structuredClone(data);
}

/**
 * Groups an array of objects by a specific key
 */
export function groupBy<T extends Record<string, any>>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((acc, item) => {
    const group = String(item[key]);
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

/**
 * Normalizes input to an array to handle single/multiple items
 */
export function ensureArray<T>(input: Nullable<T | T[]>): T[] {
  if (Array.isArray(input)) return input;
  return input !== null && input !== undefined ? [input] : [];
}

/**
 * Checks if a value is a non-null object
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}