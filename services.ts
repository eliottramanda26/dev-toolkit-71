import { memoize } from './utils';

interface ProcessOptions {
  heavyComputation: boolean;
}

/**
 * optimized data processor using a cache to avoid redundant calculations
 */
const computeExpensiveValue = memoize((input: string): number => {
  let result = 0;
  for (let i = 0; i < 1e6; i++) {
    result += Math.sqrt(input.length + i);
  }
  return result;
});

export const processData = (data: string[], options: ProcessOptions): number[] => {
  // performance optimization: skip computation if not requested
  if (!options.heavyComputation) {
    return data.map((d) => d.length);
  }

  // bulk processing with memoization to reduce CPU cycles
  return data.map((item) => computeExpensiveValue(item));
};

export const batchProcess = (items: string[]): number[] => {
  // parallel-friendly batch processing
  return items.map((item) => item.trim().length * 2);
};