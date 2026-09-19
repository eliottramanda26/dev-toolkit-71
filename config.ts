export interface AppConfig {
  port: number;
  environment: 'development' | 'production';
  debug: boolean;
}

const defaults: AppConfig = {
  port: 3000,
  environment: 'development',
  debug: false,
};

/**
 * Merges user-provided settings with default configuration values
 */
export function loadConfig(userConfig: Partial<AppConfig> = {}): AppConfig {
  return {
    ...defaults,
    ...userConfig,
  };
}

export const config = loadConfig(typeof process !== 'undefined' ? {
  port: Number(process.env.PORT),
  environment: process.env.NODE_ENV as any,
} : {});