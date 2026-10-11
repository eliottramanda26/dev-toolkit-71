export interface SafeExecOptions<T> {
  fallback: T;
  onError?: (error: Error) => void;
}

export class MathBoundaryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MathBoundaryError';
  }
}

/**
 * Safely executes a synchronous function, returning fallback on edge case failure.
 */
export function safeExecute<T>(fn: () => T, options: SafeExecOptions<T>): T {
  try {
    const result = fn();
    if (result === undefined || result === null) {
      return options.fallback;
    }
    return result;
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    options.onError?.(error);
    return options.fallback;
  }
}

/**
 * Parses JSON string safely with edge-case checks for empty input or syntax errors.
 */
export function safeJsonParse<T>(input: string, fallback: T): T {
  if (typeof input !== 'string' || !input.trim()) {
    return fallback;
  }
  try {
    const parsed = JSON.parse(input);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

/**
 * Safely clamps a numeric value, explicitly handling NaN and infinite values.
 */
export function safeClamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) {
    return Number.isNaN(value) ? min : (value > 0 ? max : min);
  }
  if (min > max) {
    throw new MathBoundaryError(`Invalid bounds: min (${min}) > max (${max})`);
  }
  return Math.min(Math.max(value, min), max);
}