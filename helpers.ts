/**
 * Utility functions for object sanitization, deep merging, and safe property access.
 */

export interface ObjectCleanOptions {
  removeNull?: boolean;
  removeUndefined?: boolean;
  removeEmptyStrings?: boolean;
}

/**
 * Recursively removes null, undefined, or empty values from an object.
 */
export function cleanObject<T extends Record<string, any>>(
  obj: T,
  options: ObjectCleanOptions = {}
): Partial<T> {
  const { removeNull = true, removeUndefined = true, removeEmptyStrings = false } = options;

  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value === null && removeNull) return acc;
    if (value === undefined && removeUndefined) return acc;
    if (value === '' && removeEmptyStrings) return acc;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const cleaned = cleanObject(value, options);
      if (Object.keys(cleaned).length > 0) {
        acc[key as keyof T] = cleaned as T[keyof T];
      }
    } else {
      acc[key as keyof T] = value;
    }

    return acc;
  }, {} as Partial<T>);
}

/**
 * Safely accesses deeply nested properties within an object structure.
 */
export function getNestedValue<T>(obj: Record<string, any>, path: string, defaultValue?: T): T | undefined {
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

/**
 * Deeply merges multiple objects into a new target without mutating inputs.
 */
export function mergeDeep<T extends Record<string, any>>(...objects: Partial<T>[]): T {
  const isObject = (item: any): item is Record<string, any> =>
    Boolean(item && typeof item === 'object' && !Array.isArray(item));

  return objects.reduce((prev, obj) => {
    if (!obj) return prev;
    Object.keys(obj).forEach((key) => {
      const pVal = prev[key];
      const oVal = obj[key];

      if (isObject(pVal) && isObject(oVal)) {
        prev[key as keyof T] = mergeDeep(pVal, oVal);
      } else if (oVal !== undefined) {
        prev[key as keyof T] = oVal as T[keyof T];
      }
    });
    return prev;
  }, {} as T);
}