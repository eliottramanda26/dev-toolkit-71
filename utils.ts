/**
 * Utility functions for dev-toolkit-71 data processing
 */

export type DataRecord = Record<string, unknown>;

/**
 * Deep cleans an object by removing null and undefined values
 */
export function cleanObject<T extends DataRecord>(obj: T): Partial<T> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== null && value !== undefined) {
      acc[key as keyof T] = value as T[keyof T];
    }
    return acc;
  }, {} as Partial<T>);
}

/**
 * Safely extracts a nested property from an object using a string path
 */
export function getDeepValue(obj: unknown, path: string): unknown {
  if (!obj || typeof obj !== 'object') return undefined;

  return path.split('.').reduce((acc: any, part) => {
    return acc && acc[part] !== undefined ? acc[part] : undefined;
  }, obj);
}

/**
 * Groups an array of objects by a specific key
 */
export function groupBy<T extends DataRecord>(items: T[], key: keyof T): Record<string, T[]> {
  return items.reduce((acc, item) => {
    const group = String(item[key]);
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}