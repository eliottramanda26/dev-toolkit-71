/**
 * Core interface for toolkit configuration items
 */
export interface ToolkitConfig {
  readonly id: string;
  name: string;
  enabled: boolean;
  priority: number;
  tags?: string[];
}

/**
 * Standardized response structure for service operations
 */
export interface ServiceResult<T> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: string;
  readonly timestamp: number;
}

/**
 * Configuration map for system-wide service settings
 */
export type ServiceSettings = Record<string, ToolkitConfig>;

/**
 * Helper type to extract status codes from utility functions
 */
export type StatusLevel = 'info' | 'warn' | 'error' | 'debug';

/**
 * Interface for logging utility events
 */
export interface LogEntry {
  message: string;
  level: StatusLevel;
  metadata?: Record<string, unknown>;
}

/**
 * Factory function type for toolkit initialization
 */
export type Initializer = (config: ToolkitConfig) => Promise<boolean>;

export const DEFAULT_CONFIG: ToolkitConfig = {
  id: 'dev-71-base',
  name: 'default-toolkit',
  enabled: true,
  priority: 1
};