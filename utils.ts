export interface ProcessingInput {
  id: string;
  value: number;
  timestamp: number;
}

/**
 * validates structure and constraints of input data
 * ensures values are within expected processing bounds
 */
export function validateInput(input: unknown): input is ProcessingInput {
  if (!input || typeof input !== 'object') return false;

  const { id, value, timestamp } = input as Partial<ProcessingInput>;

  return (
    typeof id === 'string' &&
    id.length > 0 &&
    typeof value === 'number' &&
    value >= 0 &&
    value <= 1000 &&
    typeof timestamp === 'number' &&
    timestamp > 0
  );
}

/**
 * main processing loop runner with validation
 */
export function runProcessingLoop(data: unknown[]): void {
  for (const item of data) {
    if (!validateInput(item)) {
      console.warn(`skipping invalid entry: ${JSON.stringify(item)}`);
      continue;
    }

    processItem(item);
  }
}

function processItem(item: ProcessingInput): void {
  console.log(`processing item ${item.id} with value ${item.value}`);
}