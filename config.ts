export interface AppConfig {
  port: number;
  env: 'development' | 'production';
  debug: boolean;
}

const DEFAULT_CONFIG: AppConfig = {
  port: 3000,
  env: 'development',
  debug: false,
};

/**
 * Merges partial user config with sensible defaults
 */
export function loadConfig(userConfig: Partial<AppConfig> = {}): AppConfig {
  return {
    ...DEFAULT_CONFIG,
    ...userConfig,
  };
}

// Usage example:
// const config = loadConfig({ port: 8080 });
// console.log(`Starting server on port ${config.port}`);