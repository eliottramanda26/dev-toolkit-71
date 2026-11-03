export interface ToolConfig {
  id: string;
  name: string;
  version: string;
  enabled: boolean;
}

export interface ExecutionResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: number;
}

export type ToolkitRegistry = Record<string, ToolConfig>;

/**
 * Factory for generating standard tool response objects
 */
export const createResult = <T>(data: T): ExecutionResult<T> => ({
  success: true,
  data,
  timestamp: Date.now(),
});

export const createError = (message: string): ExecutionResult => ({
  success: false,
  error: message,
  timestamp: Date.now(),
});