export interface ServiceResponse<T> {
  data: T | null;
  error: Error | null;
  timestamp: number;
}

/**
 * Executes a service operation with standardized error wrapping
 */
export async function executeService<T>(operation: () => Promise<T>): Promise<ServiceResponse<T>> {
  try {
    const result = await operation();
    return { data: result, error: null, timestamp: Date.now() };
  } catch (err) {
    return { 
      data: null, 
      error: err instanceof Error ? err : new Error(String(err)), 
      timestamp: Date.now() 
    };
  }
}

/**
 * Batch utility for handling multiple concurrent service calls
 */
export async function batchExecute<T>(operations: Array<() => Promise<T>>): Promise<ServiceResponse<T>[]> {
  return Promise.all(operations.map(op => executeService(op)));
}

export const serviceLogger = (message: string) => {
  console.log(`[dev-toolkit-71][${new Date().toISOString()}] ${message}`);
};

export default {
  executeService,
  batchExecute,
  serviceLogger
};