export interface CacheConfig {
  maxSize: number;
  ttlMs: number;
}

export const DEFAULT_CONFIG: CacheConfig = {
  maxSize: 1000,
  ttlMs: 60000,
};

/**
 * Memoized retrieval of configuration with performance optimization
 * uses a simple singleton pattern to avoid object re-allocation
 */
let cachedConfig: CacheConfig | null = null;

export const getOptimizedConfig = (overrides?: Partial<CacheConfig>): CacheConfig => {
  if (!cachedConfig) {
    cachedConfig = { ...DEFAULT_CONFIG };
  }

  if (!overrides || Object.keys(overrides).length === 0) {
    return cachedConfig;
  }

  return { ...cachedConfig, ...overrides };
};

export const clearConfigCache = (): void => {
  cachedConfig = null;
};
