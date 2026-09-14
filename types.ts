/**
 * Represents the outcome of an operation that can either succeed or fail.
 * Useful for explicit error handling without throwing exceptions.
 */
export type Result<T, E = Error> =
  | { success: true; data: T; error?: never }
  | { success: false; data?: never; error: E };

/**
 * Represents the lifecycle state of an asynchronous operation or data fetch.
 */
export type AsyncState<T, E = Error> =
  | { status: 'idle'; data: null; error: null }
  | { status: 'loading'; data: T | null; error: null }
  | { status: 'success'; data: T; error: null }
  | { status: 'error'; data: T | null; error: E };

/**
 * Options for configuring retry behavior in resilient function executions.
 */
export interface RetryOptions {
  /** Maximum number of retry attempts before failing. */
  maxRetries: number;
  /** Initial delay in milliseconds before the first retry. */
  delayMs: number;
  /** Multiplier applied to delayMs on each consecutive retry. */
  backoffFactor?: number;
  /** Optional callback triggered on every failed attempt. */
  onRetry?: (error: Error, attempt: number) => void;
}

/**
 * Generic key-value dictionary with strongly typed keys and values.
 */
export type Dictionary<V = unknown, K extends string | number | symbol = string> = Record<K, V>;

/**
 * Utility function to construct a successful Result object.
 * @param data The payload data resulting from a successful operation.
 */
export function createSuccess<T>(data: T): Result<T, never> {
  return { success: true, data };
}

/**
 * Utility function to construct a failure Result object.
 * @param error The error or reason for failure.
 */
export function createFailure<E>(error: E): Result<never, E> {
  return { success: false, error };
}