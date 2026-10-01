interface ServiceResult<T> {
  data: T | null;
  error: string | null;
}

export async function safeFetch<T>(url: string): Promise<ServiceResult<T>> {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      return { data: null, error: `HTTP Error: ${response.status} ${response.statusText}` };
    }

    const data: T = await response.json();
    return { data, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown network failure';
    console.error(`[dev-toolkit-71] Fetch failed for ${url}:`, message);
    return { data: null, error: message };
  }
}

export function validatePayload(input: unknown): boolean {
  if (input === null || typeof input !== 'object') {
    return false;
  }
  return Object.keys(input).length > 0;
}

export async function processServiceData<T>(url: string): Promise<T | null> {
  const { data, error } = await safeFetch<T>(url);

  if (error || !validatePayload(data)) {
    return null;
  }

  return data;
}