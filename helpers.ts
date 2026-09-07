/**
 * Utility functions for dev-toolkit-71
 */

export type LoggerLevel = 'info' | 'warn' | 'error';

export const formatTimestamp = (date: Date): string => {
  return date.toISOString().replace('T', ' ').substring(0, 19);
};

export const logMessage = (level: LoggerLevel, message: string): void => {
  const timestamp = formatTimestamp(new Date());
  console[level](`[${timestamp}] [${level.toUpperCase()}]: ${message}`);
};

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const validateConfig = <T extends Record<string, unknown>>(config: T, keys: (keyof T)[]): boolean => {
  return keys.every((key) => config[key] !== undefined && config[key] !== null);
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};