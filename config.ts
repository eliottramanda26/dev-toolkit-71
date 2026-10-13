export interface CacheConfig {
  maxSize: number;
  ttlMs: number;
  enableCompression: boolean;
}

/**
 * optimized configuration module with memoization patterns
 */
export const coreConfig: CacheConfig = {
  maxSize: 1024 * 1024 * 50, // 50mb heap limit
  ttlMs: 60000 * 5,
  enableCompression: true
};

const memoMap = new Map<string, any>();

export const getOptimizedConfig = <T>(key: string, compute: () => T): T => {
  if (memoMap.has(key)) {
    return memoMap.get(key);
  }
  
  const result = compute();
  memoMap.set(key, result);
  return result;
};

export const clearConfigCache = (): void => {
  memoMap.clear();
};