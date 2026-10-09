export const memoize = <T, R>(fn: (arg: T) => R): (arg: T) => R => {
  const cache = new Map<T, R>();
  return (arg: T): R => {
    if (cache.has(arg)) return cache.get(arg)!;
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
};

export const debounce = <F extends (...args: any[]) => void>(
  fn: F,
  delay: number
): ((...args: Parameters<F>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

export const batchProcess = async <T, R>(
  items: T[],
  processor: (item: T) => Promise<R>,
  concurrency: number = 3
): Promise<R[]> => {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += concurrency) {
    const chunk = items.slice(i, i + concurrency);
    const chunkResults = await Promise.all(chunk.map(processor));
    results.push(...chunkResults);
  }
  return results;
};