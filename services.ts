export interface DataService<T> {
  fetchData(id: string): Promise<T | null>;
  clearCache(): void;
}

export class BaseDataService<T> implements DataService<T> {
  private cache: Map<string, T> = new Map();

  async fetchData(id: string): Promise<T | null> {
    if (this.cache.has(id)) {
      return this.cache.get(id) || null;
    }

    try {
      const response = await fetch(`/api/v1/resource/${id}`);
      if (!response.ok) return null;
      const data: T = await response.json();
      this.cache.set(id, data);
      return data;
    } catch (error) {
      console.error(`service fetch error for ${id}:`, error);
      return null;
    }
  }

  clearCache(): void {
    this.cache.clear();
  }
}

export const createService = <T>(): DataService<T> => new BaseDataService<T>();