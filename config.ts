export interface AppConfig {
  port: number;
  debug: boolean;
  apiEndpoint: string;
}

const defaults: AppConfig = {
  port: 3000,
  debug: false,
  apiEndpoint: 'https://api.dev-toolkit-71.com',
};

/**
 * Merges user-defined configuration with system defaults
 */
export function loadConfig(userConfig: Partial<AppConfig> = {}): AppConfig {
  return {
    ...defaults,
    ...userConfig,
  };
}

/**
 * Validates that port is within valid range
 */
export function validateConfig(config: AppConfig): boolean {
  if (config.port < 1024 || config.port > 65535) {
    console.error('Invalid port range');
    return false;
  }
  return true;
}

// Usage example:
// const config = loadConfig({ port: 8080 });