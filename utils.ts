/**
 * Utility functions for general data handling and object manipulation.
 */

type PlainObject = Record<string, any>;

/**
 * Checks whether a given value is a plain JavaScript object.
 */
function isObject(item: unknown): item is PlainObject {
  return (
    item !== null &&
    typeof item === 'object' &&
    !Array.isArray(item) &&
    !(item instanceof Date) &&
    !(item instanceof RegExp)
  );
}

/**
 * Recursively merges multiple source objects into a target object.
 *
 * @param target - The primary object to merge values into
 * @param sources - Additional source objects to merge
 * @returns The recursively merged object
 */
export function deepMerge<T extends PlainObject>(
  target: T,
  ...sources: Partial<T>[]
): T {
  if (!sources.length) return target;

  const source = sources.shift();
  if (isObject(target) && isObject(source)) {
    for (const key of Object.keys(source)) {
      const sourceValue = source[key];
      const targetValue = target[key];

      if (isObject(sourceValue)) {
        if (!target[key] || !isObject(targetValue)) {
          Object.assign(target, { [key]: {} });
        }
        deepMerge(target[key], sourceValue);
      } else if (Array.isArray(sourceValue)) {
        Object.assign(target, { [key]: [...sourceValue] });
      } else if (sourceValue !== undefined) {
        Object.assign(target, { [key]: sourceValue });
      }
    }
  }

  return deepMerge(target, ...sources);
}

/**
 * Safely accesses a nested object property using dot-notation path.
 */
export function getNestedValue<T = unknown>(
  obj: PlainObject,
  path: string,
  defaultValue?: T
): T | undefined {
  const keys = path.split('.');
  let current: any = obj;

  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return defaultValue;
    }
    current = current[key];
  }

  return current !== undefined ? (current as T) : defaultValue;
}