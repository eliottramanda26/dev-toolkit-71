/**
 * safely parses a json string into an object or returns a fallback value
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch (err) {
    return fallback;
  }
}

/**
 * extracts deep values from an object using a dot-notation string path
 */
export function getDeepValue(obj: Record<string, any>, path: string): any {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

/**
 * filters out null and undefined values from an array while refining types
 */
export function filterDefined<T>(items: (T | null | undefined)[]): T[] {
  return items.filter((item): item is T => item !== null && item !== undefined);
}

/**
 * chunks an array into smaller segments for batch processing
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}