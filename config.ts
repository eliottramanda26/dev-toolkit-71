/**
 * Represents the core configuration options for the application.
 */
export interface AppConfig {
  /** The environment name, e.g., 'production', 'development'. */
  environment: 'development' | 'production' | 'test';
  /** The port number the server will listen on. */
  port: number;
  /** Database connection URL. */
  databaseUrl: string;
  /** Optional list of allowed origins for CORS. */
  allowedOrigins?: string[];
}

/**
 * Manages application configuration loading, validation, and retrieval.
 */
export class ConfigManager {
  private readonly config: AppConfig;

  /**
   * Initializes the config manager with environment variables or defaults.
   * @param overrides Optional partial configuration to override environment defaults.
   */
  constructor(overrides: Partial<AppConfig> = {}) {
    this.config = {
      environment: (process.env.NODE_ENV as AppConfig['environment']) || 'development',
      port: parseInt(process.env.PORT || '3000', 10),
      databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost:27017/dev',
      allowedOrigins: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['*'],
      ...overrides,
    };
    this.validate();
  }

  /**
   * Validates the loaded configuration to ensure critical values are present.
   * @throws Error if any required configuration fields are invalid.
   */
  private validate(): void {
    if (isNaN(this.config.port) || this.config.port <= 0) {
      throw new Error(`Invalid port number: ${this.config.port}`);
    }
    if (!this.config.databaseUrl.startsWith('mongodb://') && !this.config.databaseUrl.startsWith('postgresql://')) {
      throw new Error('Database URL must be a valid connection string');
    }
  }

  /**
   * Retrieves a copy of the validated application configuration.
   * @returns The read-only AppConfig object.
   */
  public get(): Readonly<AppConfig> {
    return Object.freeze({ ...this.config });
  }
}