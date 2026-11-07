/**
 * Utility functions for dev-toolkit-71
 */

export interface ToolkitConfig {
  version: string;
  debug: boolean;
}

export const validateConfig = (config: unknown): config is ToolkitConfig => {
  return (
    typeof config === 'object' &&
    config !== null &&
    'version' in config &&
    'debug' in config
  );
};

export const formatTimestamp = (date: Date): string => {
  return date.toISOString().replace('T', ' ').substring(0, 19);
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

export const parseInput = (input: string): string[] => {
  if (!input) return [];
  return input.split(',').map((s) => s.trim()).filter(Boolean);
};