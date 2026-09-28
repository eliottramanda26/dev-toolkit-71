/**
 * General purpose data transformation utilities for dev-toolkit-71
 */

export type Nullable<T> = T | null | undefined;

/**
 * Deep clones a serializable object to ensure immutability
 */
export function deepClone<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

/**
 * Safely accesses deeply nested properties with a default fallback
 */
export function getNestedValue<T>(obj: any, path: string[], defaultValue: T): T {
  return path.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj) ?? defaultValue;
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

/**
 * Normalizes input to an array to simplify iteration logic
 */
export function ensureArray<T>(input: Nullable<T | T[]>): T[] {
  if (Array.isArray(input)) return input;
  return input ? [input] : [];
}