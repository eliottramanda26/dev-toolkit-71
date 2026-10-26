/**
 * Memoizes function results for improved performance.
 * Utilizes a Map for O(1) average lookup times.
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * Throttles execution of high-frequency events.
 * Ensures limited processing overhead during window resize/scroll.
 */
export function throttle(fn: (...args: any[]) => void, delay: number) {
  let lastCall = 0;
  return (...args: any[]) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
}

/**
 * Optimized batch processing for large data sets
 * using generator functions to prevent event loop blocking.
 */
export function* chunkProcessor<T>(items: T[], size: number) {
  for (let i = 0; i < items.length; i += size) {
    yield items.slice(i, i + size);
  }
}