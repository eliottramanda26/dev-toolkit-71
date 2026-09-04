export interface AppConfig {
  version: string;
  timeout: number;
  debug: boolean;
}

/**
 * Application runtime defaults
 */
const defaults: AppConfig = {
  version: '1.0.0',
  timeout: 5000,
  debug: false,
};

/**
 * Environment-based configuration loader
 */
export const getConfiguration = (overrides?: Partial<AppConfig>): AppConfig => {
  return {
    ...defaults,
    ...overrides,
  };
};

export const ENV_PREFIX = 'DT71_';

export const validateConfig = (config: AppConfig): boolean => {
  return typeof config.timeout === 'number' && config.timeout > 0;
};