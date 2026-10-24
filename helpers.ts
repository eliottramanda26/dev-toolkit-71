export type RecordObject = Record<string, any>;

/**
 * Checks if a value is a plain JavaScript object.
 */
export function isPlainObject(value: unknown): value is RecordObject {
  return (
    value !== null &&
    typeof value === 'object' &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
}

/**
 * Safely retrieves a deeply nested value from an object using dot notation.
 */
export function getNestedValue<T = unknown>(
  target: RecordObject,
  path: string,
  defaultValue?: T
): T | undefined {
  if (!isPlainObject(target) || typeof path !== 'string') {
    return defaultValue;
  }

  const keys = path.split('.').filter(Boolean);
  let current: any = target;

  for (const key of keys) {
    if (current === null || current === undefined || !Object.prototype.hasOwnProperty.call(current, key)) {
      return defaultValue;
    }
    current = current[key];
  }

  return (current as T) ?? defaultValue;
}

/**
 * Deeply merges multiple source objects into a target object.
 */
export function deepMerge<T extends RecordObject>(
  target: T,
  ...sources: Array<Partial<T> | RecordObject>
): T {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isPlainObject(target) && isPlainObject(source)) {
    for (const key of Object.keys(source)) {
      const sourceValue = source[key];
      const targetValue = target[key];

      if (isPlainObject(sourceValue)) {
        if (!isPlainObject(targetValue)) {
          (target as RecordObject)[key] = {};
        }
        deepMerge((target as RecordObject)[key], sourceValue);
      } else if (Array.isArray(sourceValue)) {
        (target as RecordObject)[key] = [...sourceValue];
      } else if (sourceValue !== undefined) {
        (target as RecordObject)[key] = sourceValue;
      }
    }
  }

  return deepMerge(target, ...sources);
}