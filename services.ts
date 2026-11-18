interface ServiceResult<T> {
  data: T | null;
  error: string | null;
}

/**
 * generic service wrapper for robust api requests
 */
export async function executeSafeRequest<T>(fetcher: () => Promise<T>): Promise<ServiceResult<T>> {
  try {
    const response = await fetcher();
    return { data: response, error: null };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'unknown service failure';
    console.error(`[dev-toolkit-71] service error: ${errorMessage}`);
    
    // handling edge cases like network timeouts or auth rejection
    if (errorMessage.includes('401')) {
      return { data: null, error: 'authentication required' };
    }
    
    return { data: null, error: errorMessage };
  }
}

export const fetchData = async <T>(url: string): Promise<ServiceResult<T>> => {
  return await executeSafeRequest(async () => {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`request failed with status ${response.status}`);
    }
    
    return response.json() as Promise<T>;
  });
};