/**
 * Data handling utilities for dev-toolkit-71
 */

export type Nullable<T> = T | null | undefined;

/**
 * Safely extracts a nested property from an object
 */
export function getNestedValue<T>(obj: any, path: string): Nullable<T> {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

/**
 * Removes null or undefined values from an object
 */
export function cleanObject<T extends Record<string, any>>(obj: T): Partial<T> {
  const result = { ...obj };
  (Object.keys(result) as (keyof T)[]).forEach((key) => {
    if (result[key] === null || result[key] === undefined) {
      delete result[key];
    }
  });
  return result;
}

/**
 * Formats data into a standardized JSON string for logs
 */
export function formatPayload(data: unknown): string {
  try {
    return JSON.stringify(data, null, 2);
  } catch (error) {
    return String(data);
  }
}

/**
 * Groups an array of objects by a specific key
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((acc, item) => {
    const group = String(item[key]);
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}