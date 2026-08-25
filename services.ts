export interface Config {
  apiUrl: string;
  timeout: number;
  maxRetries: number;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}

const DEFAULT_CONFIG: Config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  maxRetries: 3,
  logLevel: 'info',
};

export class ConfigService {
  private config: Config;
  constructor(overrides: Partial<Config> = {}) {
    this.config = this.loadWithDefaults(overrides);
  }

  private loadWithDefaults(overrides: Partial<Config>): Config {
    // merge defaults with provided overrides to ensure all values are set
    return {
      ...DEFAULT_CONFIG,
      ...overrides,
    };
  }

  public getConfig(): Config {
    // return a copy to prevent external mutation
    return { ...this.config };
  }

  public getApiUrl(): string {
    return this.config.apiUrl;
  }

  public getTimeout(): number {
    return this.config.timeout;
  }

  public getMaxRetries(): number {
    return this.config.maxRetries;
  }

  public getLogLevel(): string {
    return this.config.logLevel;
  }

}

export function createConfigLoader(overrides: Partial<Config> = {}): ConfigService {
  return new ConfigService(overrides);
}

export function loadConfig(overrides: Partial<Config> = {}): Config {
  const envOverrides: Partial<Config> = { ...overrides };

  if (process.env.API_URL) {
    envOverrides.apiUrl = process.env.API_URL;
  }

  const timeout = process.env.TIMEOUT ? parseInt(process.env.TIMEOUT, 10) : NaN;
  if (!isNaN(timeout)) {
    envOverrides.timeout = timeout;
  }

  const maxRetries = process.env.MAX_RETRIES ? parseInt(process.env.MAX_RETRIES, 10) : NaN;
  if (!isNaN(maxRetries)) {
    envOverrides.maxRetries = maxRetries;
  }

  const logLevel = process.env.LOG_LEVEL;
  if (logLevel && ['debug', 'info', 'warn', 'error'].includes(logLevel)) {
    envOverrides.logLevel = logLevel as Config['logLevel'];
  }

  const service = new ConfigService(envOverrides);
  return service.getConfig();
}