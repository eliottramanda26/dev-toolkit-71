/**
 * dev-toolkit-71 helper utilities
 */

export type DataItem = Record<string, unknown>;

/**
 * deep clone of simple json objects
 */
export const clone = <T>(source: T): T => JSON.parse(JSON.stringify(source));

/**
 * chunk array into smaller segments
 */
export const chunk = <T>(array: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

/**
 * wait for a duration in milliseconds
 */
export const sleep = (ms: number): Promise<void> => 
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * extract keys from object safely
 */
export const getKeys = <T extends object>(obj: T): (keyof T)[] => 
  Object.keys(obj) as (keyof T)[];

/**
 * check if value is a plain object
 */
export const isObject = (item: unknown): item is Record<string, unknown> => {
  return typeof item === 'object' && item !== null && !Array.isArray(item);
};