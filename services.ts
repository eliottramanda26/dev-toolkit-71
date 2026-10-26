interface ServiceResult<T> {
  data: T | null;
  error: string | null;
}

/**
 * Fetches data with basic validation and error catching
 */
export async function fetchData<T>(url: string): Promise<ServiceResult<T>> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      return { data: null, error: `HTTP Error: ${response.status}` };
    }

    const data: T = await response.json();
    return { data, error: null };
  } catch (err) {
    if (err instanceof TypeError) {
      return { data: null, error: 'Network connectivity issue' };
    }
    return { 
      data: null, 
      error: err instanceof Error ? err.message : 'Unknown exception occurred' 
    };
  }
}

/**
 * Safely parses JSON strings
 */
export function safeJsonParse<T>(json: string): T | null {
  try {
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}