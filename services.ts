/**
 * dev-toolkit-71: Data handling utilities for complex objects
 */

export type DataTransformer<T, R> = (data: T) => R;

/**
 * Safely extracts a nested property from an object using a dot-notation path
 */
export function getNestedValue<T>(obj: Record<string, any>, path: string, defaultValue: T): T {
  const keys = path.split('.');
  let result = obj;

  for (const key of keys) {
    if (result === null || result === undefined || typeof result !== 'object') {
      return defaultValue;
    }
    result = result[key];
  }

  return result !== undefined ? (result as T) : defaultValue;
}

/**
 * Deeply clones an object while preserving types
 */
export function deepClone<T>(source: T): T {
  if (source === null || typeof source !== 'object') return source;
  if (Array.isArray(source)) return source.map(item => deepClone(item)) as any;

  const clone = {} as T;
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      clone[key] = deepClone(source[key]);
    }
  }
  return clone;
}

/**
 * Filters object properties based on a provided predicate
 */
export function pickBy<T extends Record<string, any>>(obj: T, predicate: (val: any) => boolean): Partial<T> {
  const result: Partial<T> = {};
  for (const key in obj) {
    if (predicate(obj[key])) {
      result[key] = obj[key];
    }
  }
  return result;
}