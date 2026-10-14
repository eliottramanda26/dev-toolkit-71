interface CacheEntry<T> {
  data: T;
  expiry: number;
}

const cache = new Map<string, CacheEntry<any>>();
const TTL_MS = 60000;

/**
 * Memoized data retrieval for core operations
 */
export async function getCachedData<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const cached = cache.get(key);
  const now = Date.now();

  if (cached && cached.expiry > now) {
    return cached.data;
  }

  const result = await fetcher();
  cache.set(key, {
    data: result,
    expiry: now + TTL_MS
  });

  return result;
}

/**
 * Batch processor for high-frequency updates
 */
export function batchProcess<T>(items: T[], processor: (batch: T[]) => void, size: number = 50): void {
  for (let i = 0; i < items.length; i += size) {
    const chunk = items.slice(i, i + size);
    setTimeout(() => processor(chunk), 0);
  }
}

export function clearServiceCache(): void {
  cache.clear();
}