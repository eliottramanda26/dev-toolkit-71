export interface AppConfig {
  env: string;
  version: string;
  timeout: number;
  retries: number;
}

/**
 * default application configuration settings
 */
export const defaultConfig: AppConfig = {
  env: process.env.NODE_ENV || 'development',
  version: '1.0.0',
  timeout: 5000,
  retries: 3
};

/**
 * validates current configuration object
 */
export function validateConfig(config: AppConfig): boolean {
  if (config.timeout < 0) return false;
  if (config.retries < 0) return false;
  return true;
}

/**
 * merges partial overrides into default config
 */
export function createConfig(overrides: Partial<AppConfig>): AppConfig {
  const config = { ...defaultConfig, ...overrides };
  if (!validateConfig(config)) {
    throw new Error('invalid configuration values provided');
  }
  return config;
}