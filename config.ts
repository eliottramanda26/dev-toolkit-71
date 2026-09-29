export interface AppConfig {
  endpoint: string;
  timeout: number;
}

/**
 * Validates application configuration objects.
 * Ensures endpoint is a valid URL and timeout is positive.
 */
export function validateConfig(config: unknown): AppConfig {
  if (!config || typeof config !== 'object') {
    throw new Error('invalid configuration: object expected');
  }

  const { endpoint, timeout } = config as Partial<AppConfig>;

  if (typeof endpoint !== 'string' || !endpoint.startsWith('http')) {
    throw new Error('invalid configuration: endpoint must be a valid url string');
  }

  if (typeof timeout !== 'number' || timeout <= 0) {
    throw new Error('invalid configuration: timeout must be a positive integer');
  }

  return { endpoint, timeout };
}

/**
 * Safely parses environment configuration from process object.
 */
export function loadConfig(raw: Record<string, any>): AppConfig {
  try {
    return validateConfig(raw);
  } catch (err) {
    console.error('config initialization failure:', err instanceof Error ? err.message : String(err));
    throw new Error('application startup aborted due to configuration errors');
  }
}