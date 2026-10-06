/**
 * dev-toolkit-71 utility collection
 */

export interface ToolConfig {
  id: string;
  enabled: boolean;
  timeout: number;
}

export const validateConfig = (config: unknown): config is ToolConfig => {
  return (
    typeof config === 'object' &&
    config !== null &&
    'id' in config &&
    typeof (config as ToolConfig).id === 'string'
  );
};

export const formatTimestamp = (date: Date = new Date()): string => {
  return date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
};

export const retryOperation = async <T>(
  fn: () => Promise<T>,
  attempts: number = 3
): Promise<T> => {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === attempts - 1) throw err;
    }
  }
  throw new Error('operation failed after multiple attempts');
};

export const createSafeContext = <T extends Record<string, any>>(base: T) => {
  return Object.freeze({ ...base });
};