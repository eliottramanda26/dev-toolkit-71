interface ProcessInput {
  id: string;
  value: number;
}

/**
 * Validates the input structure before processing
 */
function isValidInput(data: any): data is ProcessInput {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.id === 'string' &&
    typeof data.value === 'number' &&
    data.value >= 0
  );
}

/**
 * Main processing loop for incoming toolkit tasks
 */
export function runProcessingLoop(items: unknown[]): void {
  for (const item of items) {
    if (!isValidInput(item)) {
      console.error('Skipping invalid input:', item);
      continue;
    }

    try {
      console.log(`Processing item ${item.id} with value ${item.value}`);
      // Execute business logic here
    } catch (error) {
      console.error(`Failed to process item ${item.id}:`, error);
    }
  }
}