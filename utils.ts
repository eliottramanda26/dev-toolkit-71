/**
 * Utility functions for data processing in dev-toolkit-71
 */

export type DataValue = string | number | boolean | null | undefined;

/**
 * Deep clones an object using JSON serialization
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Removes undefined and null values from an object
 */
export function sanitizeData<T extends Record<string, any>>(obj: T): Partial<T> {
  const result: any = {};
  for (const key in obj) {
    if (obj[key] !== undefined && obj[key] !== null) {
      result[key] = obj[key];
    }
  }
  return result as Partial<T>;
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
 * Safe access to nested object properties
 */
export function getNestedValue(obj: any, path: string[]): any {
  return path.reduce((prev, curr) => (prev && prev[curr] !== undefined ? prev[curr] : undefined), obj);
}