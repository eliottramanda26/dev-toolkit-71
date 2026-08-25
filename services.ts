// General data handling utilities
export interface DataObject {
  [key: string]: any;
}
// Deep clone function for safe data copying
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as unknown as T;
  }
  const cloned: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone((obj as any)[key]);
    }
  }
  return cloned;
}
// Deep merge for combining data objects recursively
export function deepMerge<T extends DataObject, U extends DataObject>(
  target: T,
  source: U
): T & U {
  const result: any = deepClone(target);
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      const targetValue = result[key];
      if (
        typeof sourceValue === 'object' &&
        sourceValue !== null &&
        !Array.isArray(sourceValue) &&
        typeof targetValue === 'object' &&
        targetValue !== null &&
        !Array.isArray(targetValue)
      ) {
        result[key] = deepMerge(targetValue, sourceValue);
      } else {
        result[key] = deepClone(sourceValue);
      }
    }
  }
  return result;
}
// Flatten nested data into flat structure with dot keys
export function flattenObject(obj: DataObject, prefix: string = ''): DataObject {
  const result: DataObject = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];
      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        Object.assign(result, flattenObject(value, newKey));
      } else {
        result[newKey] = value;
      }
    }
  }
  return result;
}
// Utility to process general data with merge and flatten
export function processData(data: DataObject): DataObject {
  const cloned = deepClone(data);
  const defaults: DataObject = { status: 'active', count: 0 };
  const merged = deepMerge(cloned, defaults);
  return flattenObject(merged);
}