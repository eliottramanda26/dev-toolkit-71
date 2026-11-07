export interface ApiError extends Error {
  status?: number;
  code?: string;
  details?: unknown;
}

export class ToolkitError extends Error implements ApiError {
  public status: number;
  public code: string;

  constructor(message: string, status: number = 500, code: string = 'INTERNAL_ERROR') {
    super(message);
    this.name = 'ToolkitError';
    this.status = status;
    this.code = code;
    Object.setPrototypeOf(this, ToolkitError.prototype);
  }
}

/**
 * Safely parses API responses to catch structure mismatches
 */
export function validateApiResponse<T>(data: unknown, validator: (input: unknown) => input is T): T {
  if (!validator(data)) {
    throw new ToolkitError('Invalid API response structure', 422, 'VALIDATION_FAILED');
  }
  return data;
}

/**
 * Standardized error handling for async operations
 */
export async function handleAsyncError<T>(fn: () => Promise<T>): Promise<T | never> {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof ToolkitError) {
      throw error;
    }
    throw new ToolkitError(
      error instanceof Error ? error.message : 'An unknown error occurred',
      500,
      'UNHANDLED_EXCEPTION'
    );
  }
}