export interface AppConfig {
  port: number;
  host: string;
  debug: boolean;
}

const defaults: AppConfig = {
  port: 3000,
  host: 'localhost',
  debug: false,
};

/**
 * Merges partial config with defaults
 */
export function loadConfig(overrides: Partial<AppConfig> = {}): AppConfig {
  return { ...defaults, ...overrides };
}

/**
 * Validates environment based configuration
 */
export function fromEnv(): AppConfig {
  return {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : defaults.port,
    host: process.env.HOST || defaults.host,
    debug: process.env.DEBUG === 'true',
  };
}