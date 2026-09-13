/**
 * Optimized data processing utilities for dev-toolkit-71 core
 */

export interface PerformanceConfig {
  memoizationLimit: number;
  useCache: boolean;
}

/**
 * Caches results of expensive computations to improve throughput
 */
export function memoize<T, R>(fn: (arg: T) => R): (arg: T) => R {
  const cache = new Map<T, R>();
  return (arg: T): R => {
    if (cache.has(arg)) {
      return cache.get(arg)!;
    }
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}

/**
 * Batch processing utility to reduce event loop pressure
 */
export async function batchProcess<T, R>(
  items: T[],
  processor: (item: T) => Promise<R>,
  batchSize: number = 10
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(processor));
    results.push(...batchResults);
  }
  return results;
}

/**
 * Efficient deep clone for small object state updates
 */
export function fastClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}