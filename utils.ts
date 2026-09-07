export interface MemoizedConfig {
  maxSize: number;
  ttl: number;
}

/**
 * LRU cache implementation for frequently accessed configuration objects
 * to minimize object allocation overhead in core processing loops
 */
export class MemoizedCache<K, V> {
  private cache: Map<K, V> = new Map();
  private readonly maxSize: number;

  constructor(config: MemoizedConfig) {
    this.maxSize = config.maxSize;
  }

  public get(key: K): V | undefined {
    const value = this.cache.get(key);
    if (value) {
      // Refresh position for LRU eviction policy
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    return value;
  }

  public set(key: K, value: V): void {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  public clear(): void {
    this.cache.clear();
  }
}