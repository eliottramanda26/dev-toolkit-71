/**
 * Configuration schema and environment defaults for dev-toolkit-71
 */

export interface ToolkitConfig {
  readonly environment: 'development' | 'production' | 'staging';
  readonly port: number;
  readonly timeoutMs: number;
  readonly debug: boolean;
}

export const defaultConfig: ToolkitConfig = {
  environment: 'development',
  port: 3000,
  timeoutMs: 5000,
  debug: true,
};

/**
 * Validates that the provided configuration object meets the schema requirements
 * @param config - The raw configuration object to validate
 * @returns boolean indicating if the configuration is valid
 */
export function validateConfig(config: Partial<ToolkitConfig>): boolean {
  if (config.port !== undefined && (config.port < 1024 || config.port > 65535)) {
    return false;
  }
  return true;
}

/**
 * Merges user provided overrides with the established default configuration
 * @param overrides - Partial configuration values to apply
 * @returns A fully merged ToolkitConfig object
 */
export function createConfig(overrides: Partial<ToolkitConfig>): ToolkitConfig {
  return {
    ...defaultConfig,
    ...overrides,
  };
}