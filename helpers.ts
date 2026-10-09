/**
 * Optimized utility for high-frequency data processing.
 * Implements memoization to prevent redundant calculations.
 */

const memoizationCache = new Map<string, any>();

export const computeExpensiveData = <T>(key: string, processor: () => T, ttl: number = 5000): T => {
  const now = Date.now();
  const cached = memoizationCache.get(key);

  if (cached && now - cached.timestamp < ttl) {
    return cached.value;
  }

  const result = processor();
  memoizationCache.set(key, { value: result, timestamp: now });
  
  return result;
};

/**
 * Batch process array elements with concurrency control
 */
export const processInBatches = async <T, R>(
  items: T[], 
  fn: (item: T) => Promise<R>, 
  batchSize: number = 10
): Promise<R[]> => {
  const results: R[] = [];
  
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const chunk = await Promise.all(batch.map(fn));
    results.push(...chunk);
  }

  return results;
};

export const clearCache = (): void => {
  memoizationCache.clear();
};