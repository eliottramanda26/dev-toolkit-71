interface ProcessInput {
  id: string;
  value: number;
}

/**
 * Validates processing inputs for dev-toolkit-71 core loop
 */
export function validateInput(input: unknown): input is ProcessInput {
  if (!input || typeof input !== 'object') return false;

  const hasId = 'id' in input && typeof (input as any).id === 'string';
  const hasValue = 'value' in input && typeof (input as any).value === 'number';

  return hasId && hasValue && (input as ProcessInput).value >= 0;
}

/**
 * Orchestrates batch validation within the processing loop
 */
export function processBatch(items: unknown[]): ProcessInput[] {
  const validItems: ProcessInput[] = [];

  for (const item of items) {
    if (validateInput(item)) {
      validItems.push(item);
    } else {
      console.warn('Skipping invalid item in processing queue:', item);
    }
  }

  return validItems;
}