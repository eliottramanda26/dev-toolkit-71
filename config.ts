/**
 * Environment modes supported by dev-toolkit-71.
 */
export type Environment = 'development' | 'staging' | 'production' | 'test';

/**
 * Log level options for the application logger.
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/**
 * Configuration options for database connection pooling.
 */
export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  maxConnections: number;
  ssl: boolean;
}

/**
 * Complete configuration schema for dev-toolkit-71 applications.
 */
export interface AppConfig {
  env: Environment;
  port: number;
  logLevel: LogLevel;
  apiPrefix: string;
  enableCors: boolean;
  database: DatabaseConfig;
}

/**
 * Default application configuration values.
 */
const defaultConfig: AppConfig = {
  env: 'development',
  port: 3000,
  logLevel: 'info',
  apiPrefix: '/api/v1',
  enableCors: true,
  database: {
    host: 'localhost',
    port: 5432,
    database: 'dev_db',
    maxConnections: 10,
    ssl: false,
  },
};

/**
 * Merges custom user configuration with system default options.
 *
 * @param partial - Partial configuration object containing custom overrides
 * @returns Fully resolved AppConfig object
 */
export function resolveConfig(partial: Partial<AppConfig> = {}): AppConfig {
  return {
    ...defaultConfig,
    ...partial,
    database: {
      ...defaultConfig.database,
      ...(partial.database || {}),
    },
  };
}

/**
 * Parses numeric environment variables safely with fallback defaults.
 *
 * @param value - Raw environment string value
 * @param fallback - Default fallback number if parsing fails
 * @returns Parsed integer value or fallback
 */
export function parseEnvNumber(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const parsed = parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}
