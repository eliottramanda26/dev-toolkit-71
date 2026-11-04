export interface AppConfig {
  apiUrl: string;
  timeout: number;
  retries: number;
}

export const validateConfig = (config: unknown): AppConfig => {
  if (!config || typeof config !== 'object') {
    throw new Error('invalid configuration object provided');
  }

  const { apiUrl, timeout, retries } = config as Partial<AppConfig>;

  if (typeof apiUrl !== 'string' || !apiUrl.startsWith('http')) {
    throw new Error('invalid api url configuration');
  }

  return {
    apiUrl,
    timeout: typeof timeout === 'number' && timeout > 0 ? timeout : 5000,
    retries: typeof retries === 'number' && retries >= 0 ? retries : 3,
  };
};

export const loadConfig = (input: string): AppConfig => {
  try {
    const parsed = JSON.parse(input);
    return validateConfig(parsed);
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new Error('failed to parse configuration json');
    }
    throw err;
  }
};