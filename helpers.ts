interface ProcessInput {
  id: string;
  value: number;
  timestamp: number;
}

/**
 * validates structure and value constraints for processor
 */
export function validateInput(input: unknown): input is ProcessInput {
  if (typeof input !== 'object' || input === null) return false;

  const { id, value, timestamp } = input as Record<string, unknown>;

  const isIdValid = typeof id === 'string' && id.length > 0;
  const isValueValid = typeof value === 'number' && Number.isFinite(value);
  const isTimestampValid = typeof timestamp === 'number' && timestamp > 0;

  return isIdValid && isValueValid && isTimestampValid;
}

/**
 * sanitized loop processor
 */
export function runProcessingLoop(data: unknown[]): void {
  for (const item of data) {
    if (!validateInput(item)) {
      console.warn('skipping invalid input record', item);
      continue;
    }

    processItem(item);
  }
}

function processItem(item: ProcessInput): void {
  console.log(`processing ${item.id}: ${item.value}`);
}