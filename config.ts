export interface AppConfig {
  env: 'development' | 'production' | 'test';
  port: number;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  database: {
    host: string;
    port: number;
    name: string;
  };
  features: {
    enableMetrics: boolean;
    enableCors: boolean;
  };
}

export const defaultConfig: AppConfig = {
  env: 'development',
  port: 3000,
  logLevel: 'info',
  database: {
    host: 'localhost',
    port: 5432,
    name: 'dev_db',
  },
  features: {
    enableMetrics: false,
    enableCors: true,
  },
};

/**
 * Merges user configuration overrides with default settings
 * and environment variable fallbacks.
 */
export function loadConfig(overrides: Partial<AppConfig> = {}): AppConfig {
  const envName = (typeof process !== 'undefined' && process.env?.NODE_ENV) as AppConfig['env'];
  const envPort = typeof process !== 'undefined' && process.env?.PORT ? parseInt(process.env.PORT, 10) : undefined;

  return {
    ...defaultConfig,
    ...overrides,
    env: overrides.env ?? envName ?? defaultConfig.env,
    port: overrides.port ?? (envPort && !isNaN(envPort) ? envPort : defaultConfig.port),
    database: {
      ...defaultConfig.database,
      ...overrides.database,
    },
    features: {
      ...defaultConfig.features,
      ...overrides.features,
    },
  };
}