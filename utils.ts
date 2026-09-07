/**
 * High-performance LRU cache utility for memoizing expensive operations
 * across core dev-toolkit components.
 */
export class LRUCache<K, V> {
  private readonly capacity: number;
  private cache: Map<K, V> = new Map();

  constructor(capacity = 250) {
    if (capacity <= 0) {
      throw new Error('Cache capacity must be greater than zero');
    }
    this.capacity = capacity;
  }

  get(key: K): V | undefined {
    if (!this.cache.has(key)) return undefined;
    const value = this.cache.get(key)!;
    // Refresh key priority in Map iteration order
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }
    this.cache.set(key, value);
  }

  clear(): void {
    this.cache.clear();
  }

  get size(): number {
    return this.cache.size;
  }
}

/**
 * Wraps a synchronous function with LRU-based memoization to prevent redundant calculations.
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  maxSize = 100
): T {
  const cache = new LRUCache<string, ReturnType<T>>(maxSize);

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    const cachedResult = cache.get(key);
    if (cachedResult !== undefined) {
      return cachedResult;
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}
