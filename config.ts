export interface AppConfig {
  port: number;
  host: string;
  debug: boolean;
}

export const DEFAULT_CONFIG: AppConfig = {
  port: 3000,
  host: 'localhost',
  debug: false,
};

/**
 * Merges partial user config with application defaults
 */
export function loadConfig(userConfig: Partial<AppConfig> = {}): AppConfig {
  return {
    ...DEFAULT_CONFIG,
    ...userConfig,
  };
}

/**
 * Validates that the configuration meets required constraints
 */
export function validateConfig(config: AppConfig): void {
  if (config.port < 1 || config.port > 65535) {
    throw new Error(`Invalid port number: ${config.port}`);
  }
  if (!config.host || config.host.length === 0) {
    throw new Error('Host must be a non-empty string');
  }
}