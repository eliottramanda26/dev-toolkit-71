/**
 * Configuration interface for application environment settings
 */
export interface AppConfig {
  readonly apiUrl: string;
  readonly timeoutMs: number;
  readonly retryAttempts: number;
  readonly environment: 'development' | 'staging' | 'production';
}

/**
 * Application default configuration constants
 */
export const config: AppConfig = {
  apiUrl: process.env.API_URL || 'https://api.dev-toolkit-71.com',
  timeoutMs: 5000,
  retryAttempts: 3,
  environment: (process.env.NODE_ENV as AppConfig['environment']) || 'development',
};

/**
 * Type guard for environment validation
 */
export const isProduction = (env: AppConfig['environment']): boolean => {
  return env === 'production';
};

/**
 * Returns a formatted timeout duration based on environment
 */
export const getRequestTimeout = (cfg: AppConfig): number => {
  return isProduction(cfg.environment) ? cfg.timeoutMs : cfg.timeoutMs * 2;
};