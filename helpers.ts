export interface SafeResult<T> {
  data: T | null;
  error: string | null;
}

/**
 * safely execute a promise-based operation with error parsing
 */
export async function safeExecute<T>(fn: () => Promise<T>): Promise<SafeResult<T>> {
  try {
    const data = await fn();
    return { data, error: null };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'unknown error occurred';
    console.error(`[dev-toolkit-71]: ${message}`);
    return { data: null, error: message };
  }
}

/**
 * validate input types before execution to prevent runtime crashes
 */
export function validateInput<T>(input: T | null | undefined): input is T {
  if (input === null || input === undefined) {
    console.warn('[dev-toolkit-71]: invalid input detected');
    return false;
  }
  return true;
}

export function formatErrorMessage(err: unknown): string {
  if (typeof err === 'string') return err;
  if (err instanceof Error) return err.message;
  return 'unexpected runtime exception';
}