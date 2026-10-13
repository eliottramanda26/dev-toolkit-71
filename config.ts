interface Config {
  port: number;
  env: string;
  debug: boolean;
}

const DEFAULT_CONFIG: Config = {
  port: 3000,
  env: 'development',
  debug: false,
};

/**
 * Merges partial config with defaults for dev-toolkit-71
 */
export function loadConfig(userConfig: Partial<Config> = {}): Config {
  return {
    ...DEFAULT_CONFIG,
    ...userConfig,
  };
}

/**
 * Validates environment settings for strict mode
 */
export function validateConfig(config: Config): void {
  if (config.port < 1024 && config.env === 'production') {
    throw new Error('privileged ports disallowed in production');
  }
}