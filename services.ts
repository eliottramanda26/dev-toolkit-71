/**
 * Utility functions for dev-toolkit-71 data processing
 */

export type DataTransformer<T, U> = (data: T) => U;

export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((acc, item) => {
    const groupKey = String(item[key]);
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {} as Record<string, T[]>);
};

export const normalizeData = <T, U>(
  data: T[], 
  transformer: DataTransformer<T, U>
): U[] => {
  if (!Array.isArray(data)) {
    throw new Error('Input must be an array');
  }
  return data.map(transformer);
};

export const filterNullable = <T>(array: (T | null | undefined)[]): T[] => {
  return array.filter((item): item is T => item !== null && item !== undefined);
};