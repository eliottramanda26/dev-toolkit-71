/**
 * Core utility functions for dev-toolkit-71
 */

export type Nullable<T> = T | null | undefined;

export interface ProcessResult {
  success: boolean;
  timestamp: number;
  message?: string;
}

/**
 * Validates if an input is a non-empty string
 */
export function isValidString(input: unknown): input is string {
  return typeof input === 'string' && input.trim().length > 0;
}

/**
 * Formats a payload for toolkit operations
 */
export function createResult(success: boolean, message?: string): ProcessResult {
  return {
    success,
    timestamp: Date.now(),
    message,
  };
}

/**
 * Safely parses a JSON string with fallback
 */
export function safeJsonParse<T>(data: string, fallback: T): T {
  try {
    return JSON.parse(data) as T;
  } catch {
    return fallback;
  }
}

/**
 * Delays execution by specified milliseconds
 */
export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}