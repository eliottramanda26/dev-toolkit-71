export interface AppConfig {
  port: number;
  host: string;
  debug: boolean;
}

const defaults: AppConfig = {
  port: 3000,
  host: 'localhost',
  debug: false,
};

/**
 * Merges partial user configuration with system defaults
 */
export function loadConfig(userConfig: Partial<AppConfig>): AppConfig {
  return {
    ...defaults,
    ...userConfig,
  };
}

/**
 * Validates environment variables for critical settings
 */
export function getEnvConfig(): AppConfig {
  return {
    port: parseInt(process.env.PORT || '') || defaults.port,
    host: process.env.HOST || defaults.host,
    debug: process.env.DEBUG === 'true',
  };
}