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
export function loadConfig(path: string): AppConfig {
  try {
    const fileData = readFileSync(path, 'utf-8');
    const parsed: Partial<AppConfig> = JSON.parse(fileData);
    
    return {
      ...DEFAULT_CONFIG,
      ...parsed
    };
  } catch (error) {
    console.error('Config file missing or invalid, using defaults');
    return DEFAULT_CONFIG;
  }
}

export const config = loadConfig('./config.json');