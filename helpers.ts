/**
 * Deeply clones an object and removes keys with null or undefined values.
 * Useful for cleaning payload data before API requests.
 */
export function sanitizePayload<T extends Record<string, any>>(data: T): Partial<T> {
  const clean: any = {};

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key];

      if (value !== null && value !== undefined) {
        if (typeof value === 'object' && !Array.isArray(value)) {
          clean[key] = sanitizePayload(value);
        } else {
          clean[key] = value;
        }
      }
    }
  }

  return clean as Partial<T>;
}

/**
 * Groups an array of objects by a specific key.
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

/**
 * Safe check for empty values (null, undefined, or empty string).
 */
export function isEmpty(value: unknown): boolean {
  return value === null || value === undefined || value === '';
}