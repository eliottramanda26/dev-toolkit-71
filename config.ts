export interface PerformanceConfig {
  cacheTtl: number;
  batchSize: number;
  enableMemoization: boolean;
}

/**
 * Configuration for core module performance optimizations
 */
export const corePerformanceConfig: PerformanceConfig = {
  cacheTtl: 300000,
  batchSize: 50,
  enableMemoization: true,
};

/**
 * Optimized cache implementation using Map for O(1) access
 */
export class PerformanceCache<K, V> {
  private cache = new Map<K, { value: V; expiry: number }>();

  set(key: K, value: V): void {
    const expiry = Date.now() + corePerformanceConfig.cacheTtl;
    this.cache.set(key, { value, expiry });
  }

  get(key: K): V | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }
    return entry.value;
  }

  clearExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiry) this.cache.delete(key);
    }
  }
}