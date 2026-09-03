export interface AppConfig {
  version: string;
  timeout: number;
  debug: boolean;
}

/**
 * Application runtime configuration settings
 */
export const config: AppConfig = {
  version: '1.0.0',
  timeout: 5000,
  debug: process.env.NODE_ENV !== 'production',
};

/**
 * Validation helper for environment variables
 */
export function validateConfig(cfg: AppConfig): boolean {
  return typeof cfg.timeout === 'number' && cfg.timeout > 0;
}

export const DEFAULTS = Object.freeze({
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
});