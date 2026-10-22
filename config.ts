/**
 * Configuration manager for developer toolkit services and environments.
 */

export type Environment = 'development' | 'staging' | 'production' | 'test';

export interface AppConfig {
  env: Environment;
  port: number;
  apiPrefix: string;
  debug: boolean;
  timeoutMs: number;
  maxRetries: number;
}

export interface ConfigOptions {
  overrides?: Partial<AppConfig>;
  envSource?: Record<string, string | undefined>;
}

const DEFAULT_CONFIG: AppConfig = {
  env: 'development',
  port: 3000,
  apiPrefix: '/api/v1',
  debug: true,
  timeoutMs: 5000,
  maxRetries: 3,
};

/**
 * Parses raw environment variables into typed configuration options.
 *
 * @param source - Raw key-value environment variable record
 * @returns Partial configuration object with parsed values
 */
function parseEnvVars(source: Record<string, string | undefined>): Partial<AppConfig> {
  const parsed: Partial<AppConfig> = {};

  if (source.NODE_ENV && ['development', 'staging', 'production', 'test'].includes(source.NODE_ENV)) {
    parsed.env = source.NODE_ENV as Environment;
  }

  if (source.PORT) {
    const parsedPort = parseInt(source.PORT, 10);
    if (!isNaN(parsedPort) && parsedPort > 0) {
      parsed.port = parsedPort;
    }
  }

  if (source.API_PREFIX) {
    parsed.apiPrefix = source.API_PREFIX;
  }

  if (source.DEBUG !== undefined) {
    parsed.debug = source.DEBUG.toLowerCase() === 'true' || source.DEBUG === '1';
  }

  if (source.TIMEOUT_MS) {
    const parsedTimeout = parseInt(source.TIMEOUT_MS, 10);
    if (!isNaN(parsedTimeout) && parsedTimeout > 0) {
      parsed.timeoutMs = parsedTimeout;
    }
  }

  return parsed;
}

/**
 * Loads and constructs application configuration combining defaults,
 * environment variables, and manual overrides.
 *
 * @param options - Configuration loading options including overrides and env source
 * @returns Fully populated application configuration object
 */
export function loadConfig(options: ConfigOptions = {}): AppConfig {
  const envSource = options.envSource || (typeof process !== 'undefined' ? process.env : {});
  const envConfig = parseEnvVars(envSource);

  return {
    ...DEFAULT_CONFIG,
    ...envConfig,
    ...(options.overrides || {}),
  };
}