export type Result<T, E = Error> = { success: true; data: T } | { success: false; error: E };

export class DevToolkitError extends Error {
  constructor(public message: string, public code: string, public context?: Record<string, unknown>) {
    super(message);
    this.name = 'DevToolkitError';
  }
}

/**
 * safely execute async operations with standard error wrapping
 */
export async function safeExecute<T>(fn: () => Promise<T>): Promise<Result<T, DevToolkitError>> {
  try {
    const data = await fn();
    return { success: true, data };
  } catch (err) {
    const error = err instanceof Error 
      ? new DevToolkitError(err.message, 'RUNTIME_EXCEPTION', { original: err })
      : new DevToolkitError('Unknown error occurred', 'UNKNOWN_ERROR', { err });
    
    return { success: false, error };
  }
}

/**
 * validate input types before process execution
 */
export function assertNonEmpty<T>(value: T | null | undefined, name: string): T {
  if (value === null || value === undefined) {
    throw new DevToolkitError(`Value ${name} cannot be empty`, 'VALIDATION_ERROR');
  }
  return value;
}