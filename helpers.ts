interface Config {
  port: number;
  host: string;
  debug: boolean;
}

const DEFAULT_CONFIG: Config = {
  port: 3000,
  host: 'localhost',
  debug: false
};

/**
 * Merges partial config with defaults
 */
export function loadConfig(userConfig: Partial<Config> = {}): Config {
  return {
    ...DEFAULT_CONFIG,
    ...userConfig
  };
}

/**
 * Environment-aware configuration retrieval
 */
export function getAppConfig(): Config {
  const envConfig: Partial<Config> = {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : undefined,
    host: process.env.HOST,
    debug: process.env.DEBUG === 'true'
  };

  // Remove undefined keys to prevent overriding defaults with undefined
  Object.keys(envConfig).forEach((key) => {
    if (envConfig[key as keyof Config] === undefined) {
      delete envConfig[key as keyof Config];
    }
  });

  return loadConfig(envConfig);
}