/**
 * Utility for safe deep property access and data transformation
 */

export const getDeepValue = <T, K extends keyof T>(obj: T, path: string[]): any => {
  return path.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj as any);
};

export const isNotEmpty = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined;
};

export const sanitizeData = <T extends Record<string, any>>(data: T, allowedKeys: (keyof T)[]): Partial<T> => {
  const sanitized: Partial<T> = {};
  for (const key of allowedKeys) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      sanitized[key] = data[key];
    }
  }
  return sanitized;
};

export const chunkArray = <T>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
};

export const generateId = (prefix: string = 'dev'): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};