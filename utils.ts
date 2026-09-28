export const memoize = <T, R>(fn: (arg: T) => R): (arg: T) => R => {
  const cache = new Map<T, R>();
  return (arg: T): R => {
    if (cache.has(arg)) {
      return cache.get(arg)!;
    }
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
};

export const throttle = <T extends any[]>(fn: (...args: T) => void, limit: number) => {
  let inThrottle = false;
  return (...args: T) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const debounce = <T extends any[]>(fn: (...args: T) => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: T) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

export const batchProcess = <T, R>(items: T[], fn: (batch: T[]) => Promise<R[]>, size: number = 100): Promise<R[]> => {
  const results: R[] = [];
  const execute = async (index: number): Promise<void> => {
    if (index >= items.length) return;
    const batch = items.slice(index, index + size);
    results.push(...(await fn(batch)));
    return execute(index + size);
  };
  return execute(0).then(() => results);
};