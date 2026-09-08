/**
 * Core utility helpers for object manipulation and data transformation.
 */

export type PlainObject = Record<string, unknown>;

/**
 * Checks if a value is a plain object.
 */
export function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Recursively merges two objects, creating a new combined object.
 */
export function deepMerge<T extends PlainObject, U extends PlainObject>(target: T, source: U): T & U {
  const result = { ...target } as Record<string, unknown>;

  for (const [key, value] of Object.entries(source)) {
    if (isPlainObject(value) && isPlainObject(result[key])) {
      result[key] = deepMerge(result[key] as PlainObject, value);
    } else {
      result[key] = value;
    }
  }

  return result as T & U;
}

/**
 * Removes undefined or null values from a flat object.
 */
export function compactObject<T extends PlainObject>(obj: T): Partial<T> {
  const result: Partial<T> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== null) {
      result[key as keyof T] = value as T[keyof T];
    }
  }

  return result;
}

/**
 * Safely accesses a nested property within an object using a dot-notation path.
 */
export function getPath<T = unknown>(obj: PlainObject, path: string, fallback?: T): T | undefined {
  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (!isPlainObject(current) && !Array.isArray(current)) {
      return fallback;
    }
    current = (current as Record<string, unknown>)[key];
  }

  return (current as T) ?? fallback;
}