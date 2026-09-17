/**
 * Configuration interface for application environment settings.
 */
export interface AppConfig {
  readonly port: number;
  readonly environment: 'development' | 'staging' | 'production';
  readonly apiEndpoint: string;
  readonly timeoutMs: number;
}

/**
 * Default application settings used across dev-toolkit-71.
 */
export const defaultConfig: AppConfig = {
  port: 3000,
  environment: 'development',
  apiEndpoint: 'https://api.dev-toolkit-71.internal',
  timeoutMs: 5000
};

/**
 * Validates that the provided configuration meets minimum requirements.
 * @param config - The application configuration object
 * @returns boolean indicating validity
 */
export const validateConfig = (config: AppConfig): boolean => {
  const isValidPort = config.port > 1024 && config.port <= 65535;
  const isValidEndpoint = config.apiEndpoint.startsWith('https://');

  return isValidPort && isValidEndpoint;
};

/**
 * Merges partial config overrides into the default configuration.
 * @param overrides - Partial settings to apply
 * @returns A complete AppConfig object
 */
export const createConfig = (overrides: Partial<AppConfig>): AppConfig => {
  return {
    ...defaultConfig,
    ...overrides
  };
};