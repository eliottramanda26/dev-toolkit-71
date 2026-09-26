/**
 * Configuration management utilities for dev-toolkit-71.
 * Provides environment variable parsing, default settings, and type safety.
 */

export interface ToolkitConfig {
  /** Application environment mode */
  env: 'development' | 'staging' | 'production' | 'test';
  /** Base API URL for network services */
  apiUrl: string;
  /** Maximum retry attempts for async tasks */
  maxRetries: number;
  /** Timeout duration in milliseconds */
  timeoutMs: number;
  /** Enable detailed logging output */
  debugMode: boolean;
}

/**
 * Default configuration values used when environment overrides are not present.
 */
export const defaultConfig: ToolkitConfig = {
  env: 'development',
  apiUrl: 'http://localhost:3000/api',
  maxRetries: 3,
  timeoutMs: 5000,
  debugMode: false,
};

/**
 * Parses environment variables and merges them with default configuration settings.
 *
 * @param overrides - Optional partial configuration to override defaults manually
 * @returns Fully populated ToolkitConfig object
 */
export function loadConfig(overrides?: Partial<ToolkitConfig>): ToolkitConfig {
  const envVar = (key: string): string | undefined => {
    if (typeof process !== 'undefined' && process.env) {
      return process.env[key];
    }
    return undefined;
  };

  const parsedConfig: ToolkitConfig = {
    env: (envVar('NODE_ENV') as ToolkitConfig['env']) || defaultConfig.env,
    apiUrl: envVar('API_URL') || defaultConfig.apiUrl,
    maxRetries: envVar('MAX_RETRIES') ? parseInt(envVar('MAX_RETRIES')!, 10) : defaultConfig.maxRetries,
    timeoutMs: envVar('TIMEOUT_MS') ? parseInt(envVar('TIMEOUT_MS')!, 10) : defaultConfig.timeoutMs,
    debugMode: envVar('DEBUG') ? envVar('DEBUG') === 'true' : defaultConfig.debugMode,
  };

  return { ...parsedConfig, ...overrides };
}

/**
 * Validates that a configuration object contains valid and acceptable bounds.
 *
 * @param config - The configuration object to validate
 * @returns Boolean indicating whether configuration is valid
 */
export function validateConfig(config: ToolkitConfig): boolean {
  if (config.maxRetries < 0 || config.maxRetries > 10) {
    return false;
  }
  if (config.timeoutMs <= 0) {
    return false;
  }
  if (!config.apiUrl.startsWith('http://') && !config.apiUrl.startsWith('https://')) {
    return false;
  }
  return true;
}