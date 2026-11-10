/**
 * Memoization utility for expensive operations
 * Reduces recalculation overhead in core module
 */
export function memoize<T, R>(fn: (arg: T) => R): (arg: T) => R {
  const cache = new Map<T, R>();

  return (arg: T): R => {
    if (cache.has(arg)) {
      return cache.get(arg)!;
    }
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}

/**
 * Batched processor for high-frequency operations
 * Limits event loop starvation in dev-toolkit-71
 */
export async function processInChunks<T>(
  items: T[],
  chunkSize: number,
  processor: (item: T) => void
): Promise<void> {
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    chunk.forEach(processor);
    
    // Yield to main thread to maintain responsiveness
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
}

export const optimizedCompute = memoize((input: string): number => {
  // Simulate intensive transformation logic
  return input.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
});