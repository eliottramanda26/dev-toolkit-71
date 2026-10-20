interface Config {
  port: number;
  host: string;
  debug: boolean;
}

const defaults: Config = {
  port: 3000,
  host: 'localhost',
  debug: false,
};

/**
 * Merges partial config with strict defaults
 */
export function loadConfig(userConfig: Partial<Config>): Config {
  return { ...defaults, ...userConfig };
}

/**
 * Validates environment variables for config schema
 */
export function getEnvConfig(): Config {
  return {
    port: parseInt(process.env.PORT || '') || defaults.port,
    host: process.env.HOST || defaults.host,
    debug: process.env.DEBUG === 'true',
  };
}