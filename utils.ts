/**
 * Utility functions for dev-toolkit-71 data processing
 */

export type Nullable<T> = T | null | undefined;

/**
 * Removes null or undefined values from an array
 */
export function filterNullish<T>(arr: Nullable<T>[]): T[] {
  return arr.filter((item): item is T => item !== null && item !== undefined);
}

/**
 * Deep clones a serializable object to break reference links
 */
export function cloneData<T>(data: T): T {
  if (data === null || typeof data !== 'object') return data;
  return JSON.parse(JSON.stringify(data));
}

/**
 * Safely accesses a nested object property via path array
 */
export function getDeepValue(obj: Record<string, any>, path: string[]): any {
  return path.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

/**
 * Groups an array of objects by a specific key
 */
export function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const groupKey = String(item[key]);
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}