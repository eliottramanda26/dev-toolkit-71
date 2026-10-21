/**
 * Bounded LRU memoization cache with optional TTL for function optimizations.
 */
export interface MemoizeOptions {
  maxSize?: number;
  ttlMs?: number;
  keyResolver?: (...args: any[]) => string;
}

interface CacheEntry<V> {
  value: V;
  expiry: number | null;
}

export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  options: MemoizeOptions = {}
): T {
  const { maxSize = 100, ttlMs, keyResolver } = options;
  const cache = new Map<string, CacheEntry<ReturnType<T>>>();

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = keyResolver ? keyResolver(...args) : JSON.stringify(args);
    const now = Date.now();

    if (cache.has(key)) {
      const entry = cache.get(key)!;
      if (!entry.expiry || entry.expiry > now) {
        // Refresh key position for LRU eviction policy
        cache.delete(key);
        cache.set(key, entry);
        return entry.value;
      }
      cache.delete(key);
    }

    const result = fn(...args);

    // Evict oldest entry when capacity is reached
    if (cache.size >= maxSize) {
      const oldestKey = cache.keys().next().value;
      if (oldestKey !== undefined) {
        cache.delete(oldestKey);
      }
    }

    const expiry = ttlMs ? now + ttlMs : null;
    cache.set(key, { value: result, expiry });

    return result;
  }) as T;
}