export interface AppConfig {
  env: 'development' | 'production' | 'test';
  port: number;
  host: string;
  timeoutMs: number;
  enableDebugLogs: boolean;
}

const DEFAULT_CONFIG: AppConfig = {
  env: 'development',
  port: 3000,
  host: 'localhost',
  timeoutMs: 5000,
  enableDebugLogs: false,
};

/**
 * Loads configuration with fallback defaults and environment variables
 */
export function loadConfig(overrides: Partial<AppConfig> = {}): AppConfig {
  const env = (typeof process !== 'undefined' && process.env?.NODE_ENV as AppConfig['env']) || DEFAULT_CONFIG.env;
  const portStr = typeof process !== 'undefined' ? process.env?.PORT : undefined;
  const portEnv = portStr ? parseInt(portStr, 10) : undefined;
  const hostEnv = typeof process !== 'undefined' ? process.env?.HOST : undefined;

  const merged: AppConfig = {
    ...DEFAULT_CONFIG,
    env,
    ...(portEnv !== undefined && !isNaN(portEnv) ? { port: portEnv } : {}),
    ...(hostEnv ? { host: hostEnv } : {}),
    ...overrides,
  };

  // Basic configuration integrity assertion
  if (merged.port < 1 || merged.port > 65535) {
    throw new Error(`Configuration validation failed: Invalid port number ${merged.port}`);
  }

  return merged;
}