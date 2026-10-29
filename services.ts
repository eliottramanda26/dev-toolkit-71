export interface ServiceConfig {
  retryCount: number;
  timeoutMs: number;
}

export interface ServiceResult<T> {
  data: T | null;
  error: string | null;
  timestamp: number;
}

/**
 * Executes a data fetching operation with a predefined timeout
 */
export async function fetchData<T>(url: string, config: ServiceConfig): Promise<ServiceResult<T>> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), config.timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

    const data: T = await response.json();
    return { data, error: null, timestamp: Date.now() };
  } catch (err: unknown) {
    return {
      data: null,
      error: err instanceof Error ? err.message : 'Unknown error occurred',
      timestamp: Date.now(),
    };
  } finally {
    clearTimeout(id);
  }
}

/**
 * Formats service status messages for display
 */
export const formatStatus = (result: ServiceResult<unknown>): string => {
  if (result.error) return `Failure: ${result.error}`;
  return `Success at ${new Date(result.timestamp).toLocaleTimeString()}`;
};