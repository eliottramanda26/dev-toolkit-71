export const debounce = <T extends (...args: any[]) => void>(func: T, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const getOrElse = <T>(value: T | null | undefined, defaultValue: T): T => {
  return value ?? defaultValue;
};

export const isObject = (item: unknown): item is Record<string, unknown> => {
  return typeof item === 'object' && item !== null && !Array.isArray(item);
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const chunkArray = <T>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
};