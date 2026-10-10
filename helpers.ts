/**
 * Common utility helpers for general data manipulation and async workflows.
 */

/**
 * Splits an array into smaller chunks of specified size.
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
  if (size <= 0) return [array];
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

/**
 * Creates a debounced version of a function that delays execution.
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delayMs: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delayMs);
  };
}

/**
 * Retries an asynchronous operation with exponential backoff.
 */
export async function retryAsync<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delayMs: number = 200
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < retries - 1) {
        await new Promise((resolve) =>
          setTimeout(resolve, delayMs * Math.pow(2, attempt))
        );
      }
    }
  }
  throw lastError;
}

/**
 * Omits specified keys from an object, returning a new object.
 */
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const keySet = new Set<keyof T>(keys);
  const result = {} as Omit<T, K>;
  for (const key of Object.keys(obj) as Array<keyof T>) {
    if (!keySet.has(key)) {
      (result as any)[key] = obj[key];
    }
  }
  return result;
}
