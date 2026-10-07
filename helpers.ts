export interface AppConfig {
  port: number;
  host: string;
  debug: boolean;
}

const DEFAULT_CONFIG: AppConfig = {
  port: 3000,
  host: 'localhost',
  debug: false,
};

/**
 * Merges partial user config with sensible defaults
 */
export function loadConfig(userConfig: Partial<AppConfig>): AppConfig {
  return {
    ...DEFAULT_CONFIG,
    ...userConfig,
  };
}

/**
 * Environment-aware configuration extraction
 */
export function loadConfigFromEnv(): AppConfig {
  return {
    port: parseInt(process.env.PORT || '') || DEFAULT_CONFIG.port,
    host: process.env.HOST || DEFAULT_CONFIG.host,
    debug: process.env.DEBUG === 'true',
  };
}