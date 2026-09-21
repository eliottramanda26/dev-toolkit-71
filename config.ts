export interface AppConfig {
  apiBaseUrl: string;
  timeout: number;
}

export const validateConfig = (config: unknown): AppConfig => {
  if (typeof config !== 'object' || config === null) {
    throw new Error('Invalid configuration: object expected');
  }

  const { apiBaseUrl, timeout } = config as Record<string, unknown>;

  if (typeof apiBaseUrl !== 'string' || apiBaseUrl.length === 0) {
    throw new Error('Configuration error: apiBaseUrl must be a non-empty string');
  }

  if (typeof timeout !== 'number' || timeout <= 0) {
    throw new Error('Configuration error: timeout must be a positive number');
  }

  return { apiBaseUrl, timeout };
};

export const loadConfig = (raw: unknown): AppConfig => {
  try {
    return validateConfig(raw);
  } catch (error) {
    console.error('Failed to initialize application configuration:', error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
};