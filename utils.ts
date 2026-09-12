/**
 * Creates a debounced function that delays invoking the provided function
 * until after the specified delay in milliseconds has elapsed.
 */
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (this: any, ...args: Parameters<T>): void {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

/**
 * Groups elements of an array based on the key returned by the selector function.
 */
export function groupBy<T, K extends PropertyKey>(
  array: T[],
  getKey: (item: T) => K
): Record<K, T[]> {
  return array.reduce((accumulator, currentItem) => {
    const key = getKey(currentItem);
    if (!accumulator[key]) {
      accumulator[key] = [];
    }
    accumulator[key].push(currentItem);
    return accumulator;
  }, {} as Record<K, T[]>);
}

/**
 * Splits an array into smaller chunks of a specified maximum size.
 */
export function chunk<T>(array: T[], size: number): T[][] {
  if (size <= 0) {
    return [];
  }
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}