/**
 * Utility functions for dev-toolkit-71
 */

export interface ProcessResult<T> {
  data: T | null;
  error: Error | null;
  timestamp: number;
}

export const safeExecute = <T>(fn: () => T): ProcessResult<T> => {
  try {
    return { data: fn(), error: null, timestamp: Date.now() };
  } catch (err) {
    return { data: null, error: err as Error, timestamp: Date.now() };
  }
};

export const sanitizeString = (input: string): string => {
  return input.trim().replace(/[^a-zA-Z0-9]/g, '_');
};

export const throttle = <T extends (...args: any[]) => void>(fn: T, delay: number) => {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
};

export const debounce = <T extends (...args: any[]) => void>(fn: T, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
};