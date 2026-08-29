export interface ServiceResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

export class ServiceHandler {
  async processRequest(data: any): Promise<ServiceResponse<any>> {
    if (data === null || data === undefined) {
      return { success: false, error: 'Input data is required' };
    }
    if (typeof data !== 'object') {
      return { success: false, error: 'Input must be an object' };
    }
    try {
      if (!data.id || typeof data.id !== 'string' || data.id.trim() === '') {
        throw new Error('ID must be a non-empty string');
      }
      if (data.value === undefined) {
        throw new Error('Value is required');
      }
      if (typeof data.value === 'number' && data.value < 0) {
        throw new Error('Value cannot be negative');
      }
      const processed = {
        id: data.id,
        value: data.value,
        processedAt: new Date().toISOString()
      };
      return { data: processed, success: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      return { success: false, error: message };
    }
  }

  async batchProcess(items: any[]): Promise<ServiceResponse<any[]>> {
    if (!Array.isArray(items)) {
      return { success: false, error: 'Items must be an array' };
    }
    if (items.length === 0) {
      return { data: [], success: true };
    }
    const results: any[] = [];
    for (const item of items) {
      try {
        const result = await this.processRequest(item);
        if (result.success && result.data) {
          results.push(result.data);
        }
      } catch (error) {
        console.error('Error processing item:', error);
      }
    }
    return { data: results, success: true };
  }
}