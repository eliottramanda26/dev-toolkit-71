/**
 * Represents the current execution state of a toolkit task.
 */
export type TaskStatus = 'idle' | 'running' | 'success' | 'failed';

/**
 * Standard structure for all task execution outputs.
 */
export interface TaskResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: Error;
  durationMs: number;
}

/**
 * Execution context passed down to individual tools and runner functions.
 */
export interface TaskContext {
  env: 'development' | 'production' | 'test';
  verbose: boolean;
  startTime: number;
}

/**
 * A runnable task within the dev-toolkit lifecycle.
 */
export type TaskFunction<T = unknown> = (ctx: TaskContext) => Promise<T> | T;

/**
 * Global configuration options for the dev-toolkit-71 instance.
 */
export interface ToolkitConfig {
  name: string;
  version: string;
  debug: boolean;
  plugins?: string[];
}

/**
 * Plugable logging interface for standard output handling.
 */
export interface Logger {
  info: (message: string, ...args: unknown[]) => void;
  warn: (message: string, ...args: unknown[]) => void;
  error: (message: string, ...args: unknown[]) => void;
}