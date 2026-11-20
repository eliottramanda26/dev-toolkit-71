/**
 * Utility functions for dev-toolkit-71
 */

export interface ProcessResult {
  success: boolean;
  timestamp: number;
  data?: unknown;
}

/**
 * Sanitizes input data strings
 */
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[^a-zA-Z0-9]/g, '');
};

/**
 * Generates a standard process result object
 */
export const createResult = (success: boolean, data?: unknown): ProcessResult => ({
  success,
  timestamp: Date.now(),
  data
});

/**
 * Formats toolkit output for standard console logging
 */
export const formatOutput = (prefix: string, message: string): string => {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${prefix.toUpperCase()}]: ${message}`;
};

/**
 * Chunk array for batch processing operations
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}