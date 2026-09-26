/**
 * dev-toolkit-71: general utility helpers for data manipulation
 */

export type Nullable<T> = T | null | undefined;

/**
 * Safely deep clones a plain object using structuredClone
 */
export function cloneData<T>(data: T): T {
  return structuredClone(data);
}

/**
 * Removes null or undefined keys from an object
 */
export function stripEmpty<T extends Record<string, any>>(obj: T): Partial<T> {
  const result = { ...obj };
  for (const key in result) {
    if (result[key] === null || result[key] === undefined) {
      delete result[key];
    }
  }
  return result;
}

/**
 * Groups an array of objects by a specific property key
 */
export function groupBy<T extends Record<string, any>>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const group = String(item[key]);
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

/**
 * Checks if a value is a non-null object
 */
export function isObject(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}