interface ProcessInput {
  id: string;
  value: number;
}

/**
 * Validates processing inputs against business rules
 */
export function validateInput(input: unknown): input is ProcessInput {
  if (!input || typeof input !== 'object') {
    return false;
  }

  const { id, value } = input as Record<string, unknown>;

  return (
    typeof id === 'string' &&
    id.length > 0 &&
    typeof value === 'number' &&
    value >= 0
  );
}

/**
 * Processes items in the main loop with safety checks
 */
export function runProcessingLoop(items: unknown[]): void {
  for (const item of items) {
    if (!validateInput(item)) {
      console.error('Invalid input encountered, skipping item');
      continue;
    }

    try {
      console.log(`Processing item: ${item.id} with value: ${item.value}`);
    } catch (err) {
      console.error(`Error processing item ${item.id}:`, err);
    }
  }
}