export interface ServiceResponse<T> {
  data: T | null;
  error: string | null;
  timestamp: number;
}

/**
 * generic fetch wrapper for dev-toolkit-71
 */
export async function fetchData<T>(url: string): Promise<ServiceResponse<T>> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    const data = await response.json();
    return { data, error: null, timestamp: Date.now() };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : 'Unknown error',
      timestamp: Date.now(),
    };
  }
}

/**
 * batch process for service normalization
 */
export function normalizeData<T>(items: T[]): T[] {
  return items.filter((item) => item !== null && item !== undefined);
}

/**
 * central service configuration management
 */
export const ServiceConfig = {
  timeout: 5000,
  retries: 3,
  endpoints: {
    api: 'https://api.dev-toolkit-71.io',
    status: '/health',
  },
};