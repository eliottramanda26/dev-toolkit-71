import { readFileSync } from 'fs';

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
 * Merges file-based configuration with provided defaults
 */
export function loadConfig(path?: string): AppConfig {
  try {
    if (!path) return DEFAULT_CONFIG;
    
    const fileContent = readFileSync(path, 'utf-8');
    const parsed: Partial<AppConfig> = JSON.parse(fileContent);
    
    return {
      ...DEFAULT_CONFIG,
      ...parsed
    };
  } catch (error) {
    console.error('Failed to load config, falling back to defaults:', error);
    return DEFAULT_CONFIG;
  }
}

/**
 * Validates the configuration schema constraints
 */
export function validateConfig(config: AppConfig): boolean {
  return typeof config.port === 'number' && config.port > 0;
}