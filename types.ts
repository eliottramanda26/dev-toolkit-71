/**
 * Core interface for dev-toolkit-71 utility structures
 */
export interface ToolkitConfig {
  name: string;
  version: string;
  debugMode: boolean;
  maxRetries: number;
}

/**
 * Represents a generic execution result from toolkit services
 */
export interface ExecutionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: number;
}

/**
 * Dictionary type for environment variable maps
 */
export type EnvMap = Record<string, string | undefined>;

/**
 * Configuration validator functional type
 */
export type ValidatorFn = (config: ToolkitConfig) => boolean;

export const DEFAULT_CONFIG: ToolkitConfig = {
  name: 'dev-toolkit-71',
  version: '1.0.0',
  debugMode: false,
  maxRetries: 3
};

/**
 * Type guard for checking if a result is successful
 */
export function isSuccessful<T>(result: ExecutionResult<T>): result is ExecutionResult<T> & { data: T } {
  return result.success === true && result.data !== undefined;
}