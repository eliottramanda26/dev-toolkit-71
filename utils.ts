/**
 * Utility functions for dev-toolkit-71 data processing
 */

export type DataValue = string | number | boolean | null | undefined;

/**
 * Sanitizes object by removing undefined keys and trimming strings
 */
export function sanitizeObject<T extends Record<string, any>>(data: T): Partial<T> {
  const result: any = {};

  for (const [key, value] of Object.entries(data)) {
    if (value === undefined) continue;

    if (typeof value === 'string') {
      result[key] = value.trim();
    } else {
      result[key] = value;
    }
  }

  return result as Partial<T>;
}

/**
 * Safely parses JSON strings with default fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

/**
 * Groups array items by key property
 */
export function groupBy<T>(items: T[], key: keyof T): Record<string, T[]> {
  return items.reduce((acc, item) => {
    const groupKey = String(item[key]);
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}