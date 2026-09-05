export interface ToolkitConfig {
  readonly environment: 'development' | 'production';
  readonly maxRetries: number;
  readonly timeoutMs: number;
}

export interface ServiceResult<T> {
  readonly data: T | null;
  readonly error: string | null;
  readonly success: boolean;
}

export type LoggerConfig = {
  readonly level: 'debug' | 'info' | 'warn' | 'error';
  readonly includeTimestamp: boolean;
};

export type PluginDefinition = {
  readonly name: string;
  readonly version: string;
  readonly entryPoint: () => Promise<void>;
};

export interface StateManager<T> {
  getState(): T;
  updateState(next: Partial<T>): void;
  reset(): void;
}

export const DEFAULT_CONFIG: ToolkitConfig = {
  environment: 'development',
  maxRetries: 3,
  timeoutMs: 5000,
};