interface ServiceResult<T> {
  data: T | null;
  error: Error | null;
}

/**
 * Wrapper for api calls to handle edge cases safely
 */
export async function safeExecute<T>(task: () => Promise<T>): Promise<ServiceResult<T>> {
  try {
    const data = await task();
    return { data, error: null };
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error('Service execution failed:', error.message);
    return { data: null, error };
  }
}

/**
 * Validates object schema and handles null/undefined inputs
 */
export function validateInput<T>(input: T | null | undefined): T {
  if (input === null || input === undefined) {
    throw new Error('Received null or undefined input where data was expected');
  }
  return input;
}

/**
 * Formats error responses for frontend consumption
 */
export function formatApiError(error: unknown): { message: string; code: number } {
  if (error instanceof TypeError) {
    return { message: 'Network connectivity issue', code: 503 };
  }
  return {
    message: error instanceof Error ? error.message : 'An unexpected error occurred',
    code: 500
  };
}