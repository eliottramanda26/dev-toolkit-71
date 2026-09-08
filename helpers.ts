export interface ProcessedInput {
  id: string;
  value: number;
  timestamp: number;
}

/**
 * validates raw data structure before processing loop
 */
export function validateInput(data: unknown): data is ProcessedInput {
  if (typeof data !== 'object' || data === null) return false;

  const { id, value, timestamp } = data as Record<string, unknown>;

  return (
    typeof id === 'string' &&
    typeof value === 'number' &&
    Number.isFinite(value) &&
    typeof timestamp === 'number' &&
    timestamp > 0
  );
}

/**
 * processing logic for verified data streams
 */
export function processBatch(inputs: unknown[]): ProcessedInput[] {
  const results: ProcessedInput[] = [];

  for (const item of inputs) {
    if (validateInput(item)) {
      results.push(item);
    } else {
      console.warn('invalid payload detected in stream', item);
    }
  }

  return results;
}