interface ProcessInput {
  id: string;
  value: number;
}

/**
 * Validates processing inputs against business constraints
 */
export function validateInput(input: unknown): input is ProcessInput {
  if (!input || typeof input !== 'object') return false;
  
  const { id, value } = input as Record<string, unknown>;

  return (
    typeof id === 'string' && id.length > 0 &&
    typeof value === 'number' && Number.isFinite(value) && value >= 0
  );
}

/**
 * Executes main processing logic with input guard
 */
export function processLoop(items: unknown[]): void {
  for (const item of items) {
    if (!validateInput(item)) {
      console.warn('Skipping invalid item in loop:', item);
      continue;
    }

    try {
      console.log(`Processing item ${item.id}: ${item.value}`);
    } catch (error) {
      console.error(`Failure processing item ${item.id}:`, error);
    }
  }
}