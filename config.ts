/**
 * Configuration interface for dev-toolkit-71 core modules
 */
export interface ToolkitConfig {
  readonly version: string;
  readonly environment: 'development' | 'production' | 'test';
  readonly retryAttempts: number;
  readonly apiTimeout: number;
  readonly enableLogging: boolean;
}

/**
 * Default application configuration object
 */
export const defaultConfig: ToolkitConfig = {
  version: '1.0.0',
  environment: 'development',
  retryAttempts: 3,
  apiTimeout: 5000,
  enableLogging: true,
};

/**
 * Merges partial config with default values
 * 
 * @param overrides Partial configuration options
 * @returns Complete ToolkitConfig object
 */
export const getConfiguration = (overrides: Partial<ToolkitConfig>): ToolkitConfig => {
  return {
    ...defaultConfig,
    ...overrides,
  };
};

/**
 * Constants for environment variables
 */
export const APP_NAME: string = 'dev-toolkit-71';
export const SUPPORTED_REGIONS: readonly string[] = ['us-east-1', 'eu-west-1'];