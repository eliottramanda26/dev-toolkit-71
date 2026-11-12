export interface ToolConfig {
  name: string;
  version: string;
  environment: 'development' | 'production' | 'staging';
}

export interface TaskMetadata {
  id: string;
  priority: 1 | 2 | 3;
  tags: string[];
}

export type ProcessResult<T> = {
  data: T;
  error: Error | null;
  timestamp: number;
};

export interface ToolkitManifest {
  config: ToolConfig;
  tasks: TaskMetadata[];
  lastUpdated: Date;
}

export const createManifest = (name: string): ToolkitManifest => ({
  config: {
    name,
    version: '1.0.0',
    environment: 'development',
  },
  tasks: [],
  lastUpdated: new Date(),
});