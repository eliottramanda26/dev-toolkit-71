export interface AppConfig {
  port: number;
  env: 'development' | 'production';
  debug: boolean;
}

const DEFAULT_CONFIG: AppConfig = {
  port: 3000,
  env: 'development',
  debug: false,
};

/**
 * Merges partial config with defaults for reliable startup
 */
export function loadConfig(userConfig: Partial<AppConfig>): AppConfig {
  return {
    ...DEFAULT_CONFIG,
    ...userConfig,
  };
}

/**
 * Helper to safely extract environment variable as fallback
 */
export function getConfigFromEnv(): Partial<AppConfig> {
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : undefined;
  const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';

  return {
    ...(port && { port }),
    env,
  };
}