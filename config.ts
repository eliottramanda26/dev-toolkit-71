/**
 * Configuration interface for application environment settings
 */
export interface AppConfig {
  readonly port: number;
  readonly environment: 'development' | 'production' | 'staging';
  readonly apiTimeout: number;
  readonly enableLogging: boolean;
}

/**
 * Default application configuration object
 */
export const defaultConfig: AppConfig = {
  port: 3000,
  environment: 'development',
  apiTimeout: 5000,
  enableLogging: true,
};

/**
 * Validates provided partial config against strict types
 * @param config - The user provided configuration object
 * @returns The merged configuration object
 */
export function createConfig(config: Partial<AppConfig>): AppConfig {
  return {
    ...defaultConfig,
    ...config,
  };
}

/**
 * Helper to retrieve environment variables with type safety
 * @param key - The environment variable name
 * @returns The string value or undefined
 */
export const getEnvVar = (key: string): string | undefined => {
  return process.env[key];
};
