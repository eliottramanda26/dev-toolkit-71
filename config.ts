export interface AppConfig {
  port: number;
  env: 'development' | 'production';
  debug: boolean;
}

const defaults: AppConfig = {
  port: 3000,
  env: 'development',
  debug: false,
};

/**
 * Merges partial input with default configuration
 */
export function loadConfig(input: Partial<AppConfig>): AppConfig {
  return {
    ...defaults,
    ...input,
  };
}

/**
 * Factory for typed configuration objects
 */
export class ConfigLoader {
  private config: AppConfig;

  constructor(overrides: Partial<AppConfig> = {}) {
    this.config = loadConfig(overrides);
  }

  public get<K extends keyof AppConfig>(key: K): AppConfig[K] {
    return this.config[key];
  }

  public all(): AppConfig {
    return { ...this.config };
  }
}