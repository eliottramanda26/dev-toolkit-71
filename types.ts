/**
 * Core interface for toolkit processing units
 */
export interface TaskDefinition {
  id: string;
  name: string;
  priority: number;
  metadata?: Record<string, unknown>;
}

/**
 * Union type for operation outcomes
 */
export type OperationResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

/**
 * Configuration schema for the dev-toolkit-71 engine
 */
export interface ToolkitConfig {
  env: 'development' | 'production';
  maxConcurrency: number;
  retryAttempts: number;
  enableCache: boolean;
}

/**
 * Mapper for transformation utilities
 */
export type Transformer<I, O> = (input: I) => O;

/**
 * Generic constraint for toolkit service definitions
 */
export type ServiceFactory<T> = (config: ToolkitConfig) => T;

export const DEFAULT_CONFIG: ToolkitConfig = {
  env: 'development',
  maxConcurrency: 4,
  retryAttempts: 3,
  enableCache: true
};