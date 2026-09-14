export interface ServiceConfig {
  endpoint: string;
  timeout: number;
  retryAttempts: number;
}

/**
 * Represents a standard response envelope for toolkit operations
 */
export interface ToolkitResponse<T> {
  data: T | null;
  success: boolean;
  timestamp: number;
}

/**
 * Orchestrates communication with the dev-toolkit-71 backend
 */
export class DevToolkitService {
  private readonly config: ServiceConfig;

  constructor(config: ServiceConfig) {
    this.config = config;
  }

  /**
   * Fetches resource data with simple retry logic
   */
  public async fetchData<T>(path: string): Promise<ToolkitResponse<T>> {
    let attempts = 0;

    while (attempts < this.config.retryAttempts) {
      try {
        const response = await fetch(`${this.config.endpoint}/${path}`, {
          signal: AbortSignal.timeout(this.config.timeout),
        });

        if (!response.ok) throw new Error(`Status ${response.status}`);

        const data: T = await response.json();
        return { data, success: true, timestamp: Date.now() };
      } catch (err) {
        attempts++;
        if (attempts >= this.config.retryAttempts) break;
      }
    }

    return { data: null, success: false, timestamp: Date.now() };
  }
}