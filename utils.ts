/**
 * Memoized implementation of core calculation
 * Prevents redundant computations in dev-toolkit-71
 */

const cache = new Map<string, number>();

export const computeOptimized = (input: number, salt: string): number => {
  const key = `${input}:${salt}`;

  if (cache.has(key)) {
    return cache.get(key)!;
  }

  // Simulated intensive operation
  let result = 0;
  for (let i = 0; i < 1e6; i++) {
    result += Math.sqrt(input) * Math.random();
  }

  cache.set(key, result);
  return result;
};

/**
 * Batch processor for high-frequency updates
 */
export const batchProcess = <T>(items: T[], callback: (item: T) => void): void => {
  const startTime = performance.now();
  
  for (const item of items) {
    callback(item);
    
    // Break execution if exceeding frame budget
    if (performance.now() - startTime > 16) {
      break;
    }
  }
};

export const clearCache = (): void => {
  cache.clear();
};