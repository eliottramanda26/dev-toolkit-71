import fs from 'fs';

interface AppConfig {
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
 * Loads configuration from a JSON file and merges with defaults
 */
export function loadConfig(configPath: string): AppConfig {
  try {
    if (!fs.existsSync(configPath)) {
      return { ...DEFAULT_CONFIG };
    }

    const fileContent = fs.readFileSync(configPath, 'utf-8');
    const parsed: Partial<AppConfig> = JSON.parse(fileContent);

    return {
      ...DEFAULT_CONFIG,
      ...parsed,
    };
  } catch (error) {
    console.error('Failed to load config, falling back to defaults', error);
    return { ...DEFAULT_CONFIG };
  }
}