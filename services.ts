interface CacheEntry<T> {
  data: T;
  expiry: number;
}

/**
 * Memoized service layer for data fetching
 * Reduces redundant I/O operations
 */
class DataService {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private readonly TTL_MS = 60000;

  public async fetchData<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    const cached = this.cache.get(key);
    if (cached && cached.expiry > Date.now()) {
      return cached.data;
    }

    const data = await fetcher();
    this.cache.set(key, {
      data,
      expiry: Date.now() + this.TTL_MS,
    });

    return data;
  }

  public clearCache(): void {
    this.cache.clear();
  }

  public pruneExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (entry.expiry < now) {
        this.cache.delete(key);
      }
    }
  }
}

export const coreService = new DataService();