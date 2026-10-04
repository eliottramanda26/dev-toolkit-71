interface ProcessingInput {
  id: string;
  payload: unknown;
  timestamp: number;
}

/**
 * validates structure and types of incoming data
 */
export function validateInput(input: unknown): input is ProcessingInput {
  if (typeof input !== 'object' || input === null) return false;

  const { id, payload, timestamp } = input as any;

  return (
    typeof id === 'string' &&
    payload !== undefined &&
    typeof timestamp === 'number' &&
    !isNaN(timestamp)
  );
}

/**
 * core processing loop with validation guard
 */
export function processBatch(data: unknown[]): void {
  for (const item of data) {
    if (!validateInput(item)) {
      console.error('invalid record format detected, skipping:', item);
      continue;
    }

    try {
      const { id, payload } = item;
      console.log(`processing task ${id} with data:`, payload);
    } catch (err) {
      console.error(`execution error in task ${item.id}:`, err);
    }
  }
}