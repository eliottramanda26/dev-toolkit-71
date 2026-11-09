export interface AppConfig {
  env: 'development' | 'staging' | 'production';
  port: number;
  host: string;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  timeoutMs: number;
  enableMetrics: boolean;
}

const DEFAULT_CONFIG: AppConfig = {
  env: 'development',
  port: 3000,
  host: 'localhost',
  logLevel: 'info',
  timeoutMs: 5000,
  enableMetrics: false,
};

/**
 * Safely retrieves an environment variable value.
 */
function getEnvValue(key: string): string | undefined {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key];
  }
  return undefined;
}

/**
 * Loads application configuration by combining default values,
 * environment variables, and runtime overrides.
 */
export function loadConfig(overrides: Partial<AppConfig> = {}): AppConfig {
  const envPort = getEnvValue('PORT');
  const envHost = getEnvValue('HOST');
  const envLogLevel = getEnvValue('LOG_LEVEL') as AppConfig['logLevel'] | undefined;
  const envTimeout = getEnvValue('TIMEOUT_MS');
  const envMetrics = getEnvValue('ENABLE_METRICS');

  const envConfig: Partial<AppConfig> = {};

  if (envPort && !isNaN(Number(envPort))) {
    envConfig.port = Number(envPort);
  }
  if (envHost) {
    envConfig.host = envHost;
  }
  if (envLogLevel && ['debug', 'info', 'warn', 'error'].includes(envLogLevel)) {
    envConfig.logLevel = envLogLevel;
  }
  if (envTimeout && !isNaN(Number(envTimeout))) {
    envConfig.timeoutMs = Number(envTimeout);
  }
  if (envMetrics !== undefined) {
    envConfig.enableMetrics = envMetrics.toLowerCase() === 'true';
  }

  return {
    ...DEFAULT_CONFIG,
    ...envConfig,
    ...overrides,
  };
}