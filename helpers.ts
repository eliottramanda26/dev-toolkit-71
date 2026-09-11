/**
 * Memoizes a function result to prevent redundant calculations
 * within the dev-toolkit-71 core module.
 */
export const memoize = <T, R>(fn: (arg: T) => R): ((arg: T) => R) => {
  const cache = new Map<T, R>();

  return (arg: T): R => {
    if (cache.has(arg)) {
      return cache.get(arg)!;
    }
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
};

/**
 * Efficiently chunks large arrays for batch processing
 * to minimize event loop blocking.
 */
export const chunkArray = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

/**
 * Debounce utility to limit frequency of execution
 * for high-volume event listeners.
 */
export const debounce = <T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};