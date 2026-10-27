export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

export class ToolkitError extends Error {
  public readonly code: string;
  public readonly details?: unknown;

  constructor(error: ApiError) {
    super(error.message);
    this.name = 'ToolkitError';
    this.code = error.code;
    this.details = error.details;
  }
}

export const handleUnknownError = (err: unknown): ToolkitError => {
  if (err instanceof ToolkitError) return err;
  
  const message = err instanceof Error ? err.message : 'An unexpected error occurred';
  return new ToolkitError({
    code: 'INTERNAL_SERVER_ERROR',
    message,
    details: err
  });
};

export type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: ToolkitError };