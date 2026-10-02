/**
 * dev-toolkit-71 common utility functions
 */

export const sleep = (ms: number): Promise<void> => 
  new Promise((resolve) => setTimeout(resolve, ms));

export const chunkArray = <T>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
};

export const debounce = <F extends (...args: any[]) => any>(fn: F, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export const getOrElse = <T>(value: T | null | undefined, defaultValue: T): T => {
  return value ?? defaultValue;
};

export const isObject = (item: unknown): item is Record<string, unknown> => {
  return !!item && typeof item === 'object' && !Array.isArray(item);
};