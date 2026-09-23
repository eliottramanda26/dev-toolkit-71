/**
 * Deep merge utility for configuration objects
 */
export function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const output = { ...target };

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const value = source[key];

      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        output[key] = key in target ? deepMerge(target[key], value) : value;
      } else {
        output[key] = value as any;
      }
    }
  }

  return output;
}

/**
 * Safe object property getter with optional chaining fallback
 */
export function getSafe<T, K extends keyof T>(obj: T | null | undefined, key: K, fallback: T[K]): T[K] {
  return (obj && obj[key] !== undefined) ? obj[key] : fallback;
}

/**
 * Sanitizes data by removing undefined values
 */
export function cleanObject<T extends Record<string, any>>(obj: T): Partial<T> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Partial<T>);
}