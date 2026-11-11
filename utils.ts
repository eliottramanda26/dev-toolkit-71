/**
 * Utility functions for dev-toolkit-71
 */

export const debounce = <T extends (...args: any[]) => void>(
  fn: T, 
  delay: number
): (...args: Parameters<T>) => void => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

export const delay = (ms: number): Promise<void> => 
  new Promise((resolve) => setTimeout(resolve, ms));

export const capitalize = (str: string): string => 
  str.charAt(0).toUpperCase() + str.slice(1);

export const getOrElse = <T>(value: T | null | undefined, defaultValue: T): T => 
  (value !== null && value !== undefined) ? value : defaultValue;

export const chunkArray = <T>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
};

export const isObject = (item: unknown): item is Record<string, unknown> => {
  return !!item && typeof item === 'object' && !Array.isArray(item);
};