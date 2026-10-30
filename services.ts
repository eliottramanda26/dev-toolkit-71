export interface DataServiceConfig {
  endpoint: string;
  timeout: number;
  retries: number;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

/**
 * Fetches generic data from the toolkit endpoint
 * @param path - Resource route to append to base URL
 * @returns Promise resolving to API response object
 */
export async function fetchData<T>(path: string, config: DataServiceConfig): Promise<ApiResponse<T>> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.timeout);

  try {
    const response = await fetch(`${config.endpoint}/${path}`, {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: T = await response.json();
    return { data, status: response.status, message: 'success' };
  } catch (error) {
    return {
      data: null as any,
      status: 500,
      message: error instanceof Error ? error.message : 'unknown error',
    };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Formats toolkit payload for storage
 * @param payload - Input object to sanitize
 */
export function serializePayload<T extends Record<string, any>>(payload: T): string {
  return JSON.stringify({
    ...payload,
    timestamp: Date.now(),
    version: '1.0.0',
  });
}