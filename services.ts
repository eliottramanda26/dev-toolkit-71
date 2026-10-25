interface CacheEntry<T> {
  value: T;
  expiry: number;
}

const cache = new Map<string, CacheEntry<any>>();
const CACHE_TTL = 60000;

/**
 * Optimized data retrieval with memoization
 */
export async function getCachedData<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const cached = cache.get(key);
  const now = Date.now();

  if (cached && cached.expiry > now) {
    return cached.value;
  }

  try {
    const data = await fetcher();
    cache.set(key, {
      value: data,
      expiry: now + CACHE_TTL
    });
    return data;
  } catch (error) {
    console.error(`Failed to fetch key: ${key}`, error);
    throw error;
  }
}

/**
 * Batch processing utility to prevent event loop blocking
 */
export function processInChunks<T>(items: T[], processor: (chunk: T[]) => void, size: number = 100): void {
  for (let i = 0; i < items.length; i += size) {
    const chunk = items.slice(i, i + size);
    setTimeout(() => processor(chunk), 0);
  }
}