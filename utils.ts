/**
 * Core performance optimization utilities for dev-toolkit-71.
 * Provides memoization and efficient batch processing functions.
 */

export function memoize<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => TResult,
  resolver?: (...args: TArgs) => string
): (...args: TArgs) => TResult {
  const cache = new Map<string, TResult>();

  return function (...args: TArgs): TResult {
    const key = resolver ? resolver(...args) : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key) as TResult;
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

export async function batchProcess<T, R>(
  items: T[],
  processor: (item: T) => Promise<R>,
  batchSize: number = 50
): Promise<R[]> {
  const results: R[] = [];
  
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(processor));
    results.push(...batchResults);
  }

  return results;
}

export class PerformanceTimer {
  private start: number = performance.now();

  public reset(): void {
    this.start = performance.now();
  }

  public elapsed(): number {
    return performance.now() - this.start;
  }
}