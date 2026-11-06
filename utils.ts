import { readFileSync } from 'fs';

/**
 * Configuration schema interface
 */
export interface AppConfig {
  port: number;
  host: string;
  debug: boolean;
}

const DEFAULT_CONFIG: AppConfig = {
  port: 3000,
  host: 'localhost',
  debug: false,
};

/**
 * Loads and merges configuration with defaults
 */
export function loadConfig(path?: string): AppConfig {
  try {
    if (!path) return { ...DEFAULT_CONFIG };

    const fileContent = readFileSync(path, 'utf-8');
    const parsed: Partial<AppConfig> = JSON.parse(fileContent);

    return { ...DEFAULT_CONFIG, ...parsed };
  } catch (error) {
    console.error('Failed to load config, falling back to defaults:', error);
    return { ...DEFAULT_CONFIG };
  }
}

/**
 * Validation helper for configuration integrity
 */
export function validateConfig(config: AppConfig): boolean {
  return typeof config.port === 'number' && typeof config.host === 'string';
}