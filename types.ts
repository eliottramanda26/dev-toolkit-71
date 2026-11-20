/**
 * Core interface definitions for dev-toolkit-71
 */

export interface ToolConfig {
  name: string;
  version: string;
  enabled: boolean;
}

export interface ExecutionContext {
  timestamp: number;
  environment: 'development' | 'production';
  debug: boolean;
}

export interface TaskResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export type LoggerLevel = 'info' | 'warn' | 'error';

export interface LogEntry {
  level: LoggerLevel;
  message: string;
  metadata?: Record<string, unknown>;
}