/**
 * Generic object type for deep merge operations.
 */
export type PlainObject = Record<string, any>;

/**
 * Checks if a value is a non-null, non-array object.
 */
function isObject(item: unknown): item is PlainObject {
  return item !== null && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Recursively merges properties of source objects into a target object.
 * Handles nested objects and creates new references to prevent mutation.
 *
 * @param target The destination object
 * @param sources One or more source objects to merge
 * @returns The merged result object
 */
export function deepMerge<T extends PlainObject>(target: T, ...sources: Partial<T>[]): T {
  if (!sources.length) return target;

  const result: PlainObject = { ...target };

  for (const source of sources) {
    if (!isObject(source)) continue;

    for (const key of Object.keys(source)) {
      const targetVal = result[key];
      const sourceVal = source[key];

      if (Array.isArray(sourceVal)) {
        result[key] = [...sourceVal];
      } else if (isObject(sourceVal)) {
        if (isObject(targetVal)) {
          result[key] = deepMerge(targetVal, sourceVal);
        } else {
          result[key] = deepMerge({}, sourceVal);
        }
      } else if (sourceVal !== undefined) {
        result[key] = sourceVal;
      }
    }
  }

  return result as T;
}

/**
 * Groups array items by a key or selector function.
 *
 * @param array Collection of items to group
 * @param keySelector String key or function to determine grouping key
 */
export function groupBy<T>(
  array: T[],
  keySelector: keyof T | ((item: T) => string | number)
): Record<string | number, T[]> {
  return array.reduce((acc, item) => {
    const key = typeof keySelector === 'function'
      ? keySelector(item)
      : (item[keySelector] as unknown as string | number);

    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<string | number, T[]>);
}