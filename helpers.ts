/**
 * Utility functions for nested object property retrieval and mutation.
 */

type NestedObject = Record<string, any>;

/**
 * Parses a path string into individual keys and numeric indices.
 * Example: 'user.addresses[0].city' -> ['user', 'addresses', '0', 'city']
 */
function parsePath(path: string): string[] {
  return path
    .replace(/\[(\d+)\]/g, '.$1')
    .split('.')
    .filter(Boolean);
}

/**
 * Safely retrieves a deeply nested value from an object using dot notation.
 */
export function getByPath<T = any>(obj: NestedObject, path: string, defaultValue?: T): T | undefined {
  if (!obj || typeof obj !== 'object') {
    return defaultValue;
  }

  const keys = parsePath(path);
  let current: any = obj;

  for (const key of keys) {
    if (current === null || current === undefined || !(key in current)) {
      return defaultValue;
    }
    current = current[key];
  }

  return (current === undefined ? defaultValue : current) as T;
}

/**
 * Sets a deeply nested value in an object using dot notation.
 * Automatically constructs intermediate objects or arrays as needed.
 */
export function setByPath(obj: NestedObject, path: string, value: any): boolean {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  const keys = parsePath(path);
  if (keys.length === 0) return false;

  let current: any = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    const nextKey = keys[i + 1];

    if (!(key in current) || current[key] === null || typeof current[key] !== 'object') {
      current[key] = /^\d+$/.test(nextKey) ? [] : {};
    }

    current = current[key];
  }

  const lastKey = keys[keys.length - 1];
  current[lastKey] = value;
  return true;
}