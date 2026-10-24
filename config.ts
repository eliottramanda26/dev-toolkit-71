export interface AppConfig {
  env: 'development' | 'staging' | 'production';
  port: number;
  host: string;
  debug: boolean;
  timeoutMs: number;
  maxRetries: number;
}

export const defaultConfig: AppConfig = {
  env: 'development',
  port: 3000,
  host: 'localhost',
  debug: false,
  timeoutMs: 5000,
  maxRetries: 3,
};

export class ConfigLoader<T extends Record<string, any>> {
  private currentConfig: T;

  constructor(defaults: T) {
    this.currentConfig = { ...defaults };
  }

  /**
   * Merges partial configuration overrides into current config.
   */
  public load(overrides: Partial<T> = {}): T {
    this.currentConfig = {
      ...this.currentConfig,
      ...overrides,
    };
    return this.get();
  }

  /**
   * Attempts to parse standard environment variable overrides.
   */
  public loadFromEnv(envMapping: Record<string, keyof T>): T {
    const envOverrides: Partial<T> = {};

    for (const [envVar, configKey] of Object.entries(envMapping)) {
      const val = process.env[envVar];
      if (val !== undefined) {
        const defaultValue = this.currentConfig[configKey];
        if (typeof defaultValue === 'number') {
          envOverrides[configKey] = Number(val) as T[keyof T];
        } else if (typeof defaultValue === 'boolean') {
          envOverrides[configKey] = (val.toLowerCase() === 'true' || val === '1') as T[keyof T];
        } else {
          envOverrides[configKey] = val as T[keyof T];
        }
      }
    }

    return this.load(envOverrides);
  }

  public get(): T {
    return { ...this.currentConfig };
  }
}
