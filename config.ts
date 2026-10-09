import fs from 'fs';

interface AppConfig {
  port: number;
  env: 'development' | 'production';
  debug: boolean;
}

const defaults: AppConfig = {
  port: 3000,
  env: 'development',
  debug: false
};

/**
 * Merges file-based configuration with provided defaults
 */
export function loadConfig(configPath: string): AppConfig {
  try {
    if (!fs.existsSync(configPath)) {
      return { ...defaults };
    }

    const fileContent = fs.readFileSync(configPath, 'utf-8');
    const parsed: Partial<AppConfig> = JSON.parse(fileContent);

    return {
      ...defaults,
      ...parsed
    };
  } catch (error) {
    console.error('Failed to load config, falling back to defaults');
    return { ...defaults };
  }
}

export const config = loadConfig('./config.json');