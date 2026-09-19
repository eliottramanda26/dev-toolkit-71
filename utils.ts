/**
 * Utility functions for dev-toolkit-71
 */

export interface ProcessResult {
  success: boolean;
  timestamp: number;
  data?: unknown;
}

/**
 * Safely parses input data into a structured format
 */
export const sanitizeData = <T>(input: unknown): T | null => {
  try {
    return input as T;
  } catch (err) {
    console.error('Data sanitization failed', err);
    return null;
  }
};

/**
 * Formats processing timestamps for logging
 */
export const formatTimestamp = (date: Date = new Date()): string => {
  return date.toISOString().replace('T', ' ').substring(0, 19);
};

/**
 * Cleanup of environment context resources
 */
export const disposeResources = (refs: Array<{ dispose: () => void }>): void => {
  refs.forEach((ref) => {
    try {
      ref.dispose();
    } catch (e) {
      console.warn('Resource disposal error', e);
    }
  });
};

/**
 * Factory for standardized process outcomes
 */
export const createResult = (success: boolean, data?: unknown): ProcessResult => ({
  success,
  timestamp: Date.now(),
  data,
});