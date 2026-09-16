export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Checks if a value is a plain object.
 */
function isObject(item: unknown): item is Record<string, any> {
  return item !== null && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Deeply merges multiple source objects into a target object.
 * Properties from subsequent objects will overwrite existing properties.
 */
export function deepMerge<T extends Record<string, any>>(target: T, ...sources: DeepPartial<T>[]): T {
  if (!sources.length) {
    return target;
  }
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
        } else {
          Object.assign(target, { [key]: sourceValue });
        }
      }
    }
  }

  return deepMerge(target, ...sources);
}