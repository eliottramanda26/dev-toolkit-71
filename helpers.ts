/**
 * Safe object deep property access
 */
export function getDeepValue<T = any>(obj: any, path: string, fallback?: T): T | undefined {
  if (!obj || typeof path !== 'string') return fallback;

  const value = path.split('.').reduce((acc, part) => {
    return acc && typeof acc === 'object' ? acc[part] : undefined;
  }, obj);

  return value !== undefined ? value : fallback;
}

/**
 * Generic delay for async operations
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Type-safe array unique transformation
 */
export function uniqueArray<T>(items: T[]): T[] {
  return Array.from(new Set(items));
}

/**
 * Data validation for empty checks
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'string') return value.trim().length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}