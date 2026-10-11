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
 * Merges partial user config with standard defaults
 */
export function loadConfig(userConfig: Partial<AppConfig> = {}): AppConfig {
  return {
    ...defaults,
    ...userConfig,
  };
}

/**
 * Example usage for dev-toolkit-71
 */
export const config = loadConfig({
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : undefined,
  debug: process.env.NODE_ENV !== 'production',
});