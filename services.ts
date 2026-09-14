export class MemoizationService {
  private cache = new Map<string, { value: any; expiry: number }>();
  private defaultTtlMs: number;

  constructor(defaultTtlMs = 60000) {
    this.defaultTtlMs = defaultTtlMs;
  }

  /**
   * Executes a function and caches its result, or returns the cached result if valid.
   */
  async getOrCreate<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttlMs?: number
  ): Promise<T> {
    const now = Date.now();
    const cached = this.cache.get(key);

    if (cached && cached.expiry > now) {
      return cached.value as T;
    }

    const freshValue = await fetcher();
    const duration = ttlMs ?? this.defaultTtlMs;

    this.cache.set(key, {
      value: freshValue,
      expiry: now + duration,
    });

    return freshValue;
  }

  /**
   * Evicts a specific key from the cache.
   */
  invalidate(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clears expired items from the cache to optimize memory.
   */
  prune(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (item.expiry <= now) {
        this.cache.delete(key);
      }
    }
  }
}