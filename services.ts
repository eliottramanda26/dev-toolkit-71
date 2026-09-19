export interface DataServiceConfig {
  endpoint: string;
  timeout: number;
}

/**
 * Represents a standard response structure for API interactions
 */
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  timestamp: number;
}

/**
 * Fetches generic resources from a remote service
 * @param url Resource locator
 * @param config Configuration for the request timeout
 */
export async function fetchData<T>(url: string, config: DataServiceConfig): Promise<ApiResponse<T>> {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), config.timeout);

    const response = await fetch(`${config.endpoint}${url}`, {
      signal: controller.signal
    });

    clearTimeout(id);

    if (!response.ok) {
      return { data: null, error: `Request failed with status ${response.status}`, timestamp: Date.now() };
    }

    const data: T = await response.json();
    return { data, error: null, timestamp: Date.now() };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown network error';
    return { data: null, error: message, timestamp: Date.now() };
  }
}