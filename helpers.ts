/**
 * Utility functions for dev-toolkit-71
 */

/**
 * Safely deep clone an object using structured clone
 */
export const deepClone = <T>(obj: T): T => {
  return structuredClone(obj);
};

/**
 * Delay execution for a specified duration
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Check if a value is a valid object
 */
export const isObject = (item: unknown): item is Record<string, unknown> => {
  return item !== null && typeof item === 'object' && !Array.isArray(item);
};

/**
 * Filter undefined keys from an object
 */
export const omitUndefined = <T extends Record<string, unknown>>(obj: T): Partial<T> => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Partial<T>);
};

/**
 * Generate random hex string
 */
export const generateHex = (length: number): string => {
  return Array.from({ length }, () => Math.floor(Math.random() * 16).toString(16)).join('');
};