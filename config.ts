import * as fs from 'fs';
import * as path from 'path';
// Module for loading app config with robust error handling
// Covers missing files, parse errors, validation failures and more
// Returns safe defaults on any error to prevent crashes
interface AppConfig {
  port: number;
  host: string;
  debug: boolean;
  logLevel: 'info' | 'warn' | 'error';
  timeout: number;
}
const DEFAULT_CONFIG: AppConfig = {
  port: 3000,
  host: 'localhost',
  debug: false,
  logLevel: 'info',
  timeout: 5000
};
function isValidConfig(obj: any): obj is AppConfig {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  if (typeof obj.port !== 'number' || obj.port < 1 || obj.port > 65535) {
    return false;
  }
  if (typeof obj.host !== 'string' || obj.host.trim().length === 0) {
    return false;
  }
  if (typeof obj.debug !== 'boolean') {
    return false;
  }
  const validLevels: string[] = ['info', 'warn', 'error'];
  if (!validLevels.includes(obj.logLevel)) {
    return false;
  }
  if (typeof obj.timeout !== 'number' || obj.timeout <= 0) {
    return false;
  }
  return true;
}
export function loadConfig(configPath?: string): AppConfig {
  const resolvedPath = configPath || path.join(process.cwd(), 'config.json');
  try {
    if (!fs.existsSync(resolvedPath)) {
      console.warn(`Config file not found at ${resolvedPath}. Using default configuration.`);
      return { ...DEFAULT_CONFIG };
    }
    const fileContent = fs.readFileSync(resolvedPath, 'utf-8');
    if (fileContent.trim().length === 0) {
      console.warn('Config file is empty. Using default configuration.');
      return { ...DEFAULT_CONFIG };
    }
    let parsed: any;
    try {
      parsed = JSON.parse(fileContent);
    } catch (parseError) {
      if (parseError instanceof Error) {
        console.error(`JSON parse error: ${parseError.message}. Using defaults.`);
      }
      return { ...DEFAULT_CONFIG };
    }
    if (!isValidConfig(parsed)) {
      console.error('Config validation failed due to invalid values. Using defaults.');
      return { ...DEFAULT_CONFIG };
    }
    if (parsed.timeout > 30000) {
      console.warn('Timeout exceeds maximum, capping at 30000 ms.');
      parsed.timeout = 30000;
    }
    return parsed;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error loading config file: ${error.message}`);
    } else {
      console.error('Unknown error occurred during config loading.');
    }
    return { ...DEFAULT_CONFIG };
  }
}