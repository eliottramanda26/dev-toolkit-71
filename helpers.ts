interface ProcessingInput {
  id: string;
  payload: unknown;
  timestamp: number;
}

/**
 * validates input schema for processing loop
 */
export function validateInput(data: unknown): data is ProcessingInput {
  if (!data || typeof data !== 'object') return false;

  const input = data as Record<string, unknown>;

  const isIdValid = typeof input.id === 'string' && input.id.length > 0;
  const isPayloadValid = input.payload !== undefined;
  const isTimestampValid = typeof input.timestamp === 'number' && !isNaN(input.timestamp);

  return isIdValid && isPayloadValid && isTimestampValid;
}

/**
 * execution wrapper for main loop validation
 */
export function processLoop(items: unknown[]): void {
  for (const item of items) {
    if (!validateInput(item)) {
      console.error('validation error: skipping invalid input item');
      continue;
    }

    console.log(`processing item: ${item.id}`);
    // further logic implementation here
  }
}