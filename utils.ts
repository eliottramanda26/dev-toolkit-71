// Utility functions for general data handling in TypeScript
export function safeGet<T = any>(obj: any, path: string, defaultValue?: T): T | undefined {
  if (!obj || typeof path !== 'string') return defaultValue;
  const keys = path.split('.');
  let result: any = obj;
  for (const key of keys) {
    if (result == null || typeof result !== 'object') return defaultValue;
    result = result[key];
  }
  return result !== undefined ? result : defaultValue;
}

export function deepMerge<T extends Record<string, any>>(target: T, ...sources: Partial<T>[]): T {
  if (sources.length === 0) return target;
  const source = sources.shift()!;
  if (isPlainObject(target) && isPlainObject(source)) {
    for (const key of Object.keys(source)) {
      const srcVal = source[key];
      if (isPlainObject(srcVal)) {
        if (!target[key] || !isPlainObject(target[key])) {
          (target as any)[key] = {};
        }
        deepMerge((target as any)[key], srcVal);
      } else {
        (target as any)[key] = srcVal;
      }
    }
  }
  return deepMerge(target, ...sources);
}

function isPlainObject(value: any): value is Record<string, any> {
  return value != null && typeof value === 'object' && !Array.isArray(value);
}

export function omitKeys<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = {...obj};
  keys.forEach(key => delete result[key]);
  return result;
}

export function pickKeys<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as any;
  keys.forEach(key => {
    if (key in obj) result[key] = obj[key];
  });
  return result;
}