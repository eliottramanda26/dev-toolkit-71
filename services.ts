export interface ServiceConfig {
  endpoint: string;
  timeout: number;
  retryLimit: number;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
}

/**
 * generic fetch wrapper for dev-toolkit-71 services
 */
export async function fetchWithTimeout<T>(
  url: string,
  config: ServiceConfig
): Promise<ApiResponse<T>> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), config.timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: T = await response.json();
    return { data, status: response.status };
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

/**
 * batch service health check utility
 */
export function checkHealth(services: string[]): Promise<boolean[]> {
  return Promise.all(
    services.map(async (url) => {
      try {
        const res = await fetch(`${url}/health`);
        return res.ok;
      } catch {
        return false;
      }
    })
  );
}