export interface ServiceResponse<T> {
  data: T | null;
  error: string | null;
}

export class DataService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async fetchData<T>(endpoint: string): Promise<ServiceResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: T = await response.json();
      return { data, error: null };
    } catch (err) {
      return { 
        data: null, 
        error: err instanceof Error ? err.message : 'unknown error' 
      };
    }
  }

  public formatPayload(input: Record<string, any>): string {
    return JSON.stringify({ ...input, timestamp: Date.now() });
  }
}

export const createService = (url: string): DataService => {
  return new DataService(url);
};