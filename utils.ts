/**
 * Deeply merges multiple objects into a single target object.
 * Handles nested objects, arrays, and primitive values safely.
 */

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

function isObject(item: unknown): item is Record<string, any> {
  return Boolean(item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merges sources into a target object.
 */
export function deepMerge<T extends Record<string, any>>(
  target: T,
  ...sources: Array<DeepPartial<T> | Record<string, any>>
): T {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const sourceValue = source[key];

        if (isObject(sourceValue)) {
          if (!target[key]) {
            Object.assign(target, { [key]: {} });
          }
          deepMerge(target[key], sourceValue);
        } else if (Array.isArray(sourceValue)) {
          target[key] = [...sourceValue] as any;
        } else if (sourceValue !== undefined) {
          target[key] = sourceValue as any;
        }
      }
    }
  }

  return deepMerge(target, ...sources);
}

/**
 * Safely accesses nested object properties using a dot-notation path.
 */
export function getNestedValue<T = unknown>(
  obj: Record<string, any>,
  path: string,
  defaultValue?: T
): T | undefined {
  const keys = path.split('.');
  let current: any = obj;

  for (const key of keys) {
    if (current === null || current === undefined) {
      return defaultValue;
    }
    current = current[key];
  }

  return current !== undefined ? (current as T) : defaultValue;
}