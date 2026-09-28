import fs from 'fs';

interface AppConfig {
  port: number;
  env: 'development' | 'production';
  debug: boolean;
}

const DEFAULT_CONFIG: AppConfig = {
  port: 3000,
  env: 'development',
  debug: false,
};

/**
 * Merges user-defined configuration with system defaults.
 */
export function loadConfig(path?: string): AppConfig {
  try {
    if (!path || !fs.existsSync(path)) {
      return { ...DEFAULT_CONFIG };
    }

    const fileContent = fs.readFileSync(path, 'utf-8');
    const userConfig: Partial<AppConfig> = JSON.parse(fileContent);

    return {
      ...DEFAULT_CONFIG,
      ...userConfig,
    };
  } catch (error) {
    console.error('Configuration load failed, using defaults:', error);
    return { ...DEFAULT_CONFIG };
  }
}