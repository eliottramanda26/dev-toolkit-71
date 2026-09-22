/**
 * Core interface definitions for dev-toolkit-71
 */

export interface ToolkitConfig {
  version: string;
  environment: 'development' | 'production' | 'test';
  debugMode: boolean;
}

export interface OperationResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: number;
}

export type LoggerLevel = 'info' | 'warn' | 'error' | 'debug';

export interface LogEntry {
  level: LoggerLevel;
  message: string;
  context?: Record<string, unknown>;
}

export interface FileMetadata {
  path: string;
  size: number;
  lastModified: Date;
  extension: string;
}

export type Nullable<T> = T | null | undefined;

export interface ProcessOptions {
  timeout?: number;
  retries?: number;
  force?: boolean;
}

export const DEFAULT_CONFIG: ToolkitConfig = {
  version: '1.0.0',
  environment: 'development',
  debugMode: false
};