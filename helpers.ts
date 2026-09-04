export class OperationError extends Error {
  constructor(public message: string, public code: string, public statusCode: number = 500) {
    super(message);
    this.name = 'OperationError';
  }
}

export const safeExecute = async <T>(
  operation: () => Promise<T>,
  fallback: T
): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    if (error instanceof Error) {
      console.error(`[dev-toolkit-71] execution failed: ${error.message}`);
    } else {
      console.error('[dev-toolkit-71] unknown error occurred');
    }
    return fallback;
  }
};

export const validateInput = <T>(data: T | null | undefined, name: string): T => {
  if (data === null || data === undefined) {
    throw new OperationError(`missing required field: ${name}`, 'INVALID_INPUT', 400);
  }
  return data;
};

export const parseJsonSafely = <T>(raw: string, defaultValue: T): T => {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return defaultValue;
  }
};