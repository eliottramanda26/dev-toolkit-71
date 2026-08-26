/**
 * Deep clones any JSON-serializable data structure.
 * 
 * @template T - The type of the object being cloned
 * @param {T} source - The object to clone
 * @returns {T} A deep copy of the source object
 */
export function deepClone<T>(source: T): T {
  if (source === null || typeof source !== 'object') {
    return source;
  }

  if (source instanceof Date) {
    return new Date(source.getTime()) as unknown as T;
  }

  if (source instanceof Array) {
    const copy = [] as unknown as T;
    for (let i = 0; i < source.length; i++) {
      (copy as unknown as any[])[i] = deepClone(source[i]);
    }
    return copy;
  }

  if (source instanceof Object) {
    const copy = {} as unknown as T;
    for (const key of Object.keys(source)) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        (copy as unknown as Record<string, any>)[key] = deepClone((source as Record<string, any>)[key]);
      }
    }
    return copy;
  }

  throw new Error('Unable to copy source object; type not supported.');
}

/**
 * Safely parses a JSON string with a fallback value.
 */
export function safeJsonParse<T>(jsonString: string, fallback: T): T {
  try {
    const parsed = JSON.parse(jsonString);
    return parsed !== null ? parsed : fallback;
  } catch {
    return fallback;
  }
}
