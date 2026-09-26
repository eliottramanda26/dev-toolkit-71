/**
 * Core domain interfaces for dev-toolkit-71
 */

export interface ToolkitConfig {
  readonly version: string;
  readonly environment: 'development' | 'production' | 'test';
  readonly debug: boolean;
}

export interface ProcessResult<T> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: string;
  readonly timestamp: number;
}

export interface ResourceNode {
  readonly id: string;
  readonly path: string;
  readonly metadata: Record<string, unknown>;
}

export type Nullable<T> = T | null | undefined;

export interface RegistryMap {
  [key: string]: ResourceNode;
}

export const createResult = <T>(data: T): ProcessResult<T> => ({
  success: true,
  data,
  timestamp: Date.now(),
});

export const createError = (message: string): ProcessResult<never> => ({
  success: false,
  error: message,
  timestamp: Date.now(),
});