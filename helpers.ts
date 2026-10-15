interface ProcessingInput {
  id: string;
  value: number;
  timestamp: number;
}

/**
 * Validates processing input against schema requirements
 */
export const validateInput = (data: unknown): data is ProcessingInput => {
  if (!data || typeof data !== 'object') return false;

  const input = data as Record<string, unknown>;

  const isValid = 
    typeof input.id === 'string' &&
    typeof input.value === 'number' &&
    Number.isFinite(input.value) &&
    typeof input.timestamp === 'number' &&
    input.timestamp > 0;

  return isValid;
};

/**
 * Main processing loop controller with validation
 */
export const processBatch = (items: unknown[]): void => {
  for (const item of items) {
    if (!validateInput(item)) {
      console.error('Invalid item format detected:', item);
      continue;
    }

    try {
      console.log(`Processing item ${item.id}: ${item.value}`);
    } catch (err) {
      console.error(`Execution failed for item ${item.id}:`, err);
    }
  }
};