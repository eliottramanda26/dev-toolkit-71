/**
 * Core utility functions for dev-toolkit-71
 * Provides memoization for expensive computational tasks
 */

export type MemoizedFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => ReturnType<T>;

/**
 * Creates a memoized version of a function with simple LRU-like behavior
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): MemoizedFunction<T> {
  const cache = new Map<string, ReturnType<T>>();

  return (...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }

    const result = fn(...args);
    cache.set(key, result);

    // Prevent memory leaks by clearing cache if it grows too large
    if (cache.size > 1000) {
      cache.clear();
    }

    return result;
  };
}

/**
 * Debounce utility to limit frequency of execution
 */
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}