export interface ProcessedData {
  id: string;
  value: number;
}

/**
 * Validates processing inputs against expected schema constraints
 */
export function validateInput(input: unknown): input is ProcessedData {
  if (!input || typeof input !== 'object') {
    return false;
  }

  const { id, value } = input as Record<string, unknown>;

  return (
    typeof id === 'string' &&
    id.length > 0 &&
    typeof value === 'number' &&
    Number.isFinite(value)
  );
}

/**
 * Orchestrates input validation for the main processing loop
 */
export function processLoop(items: unknown[]): ProcessedData[] {
  const validItems: ProcessedData[] = [];

  for (const item of items) {
    if (validateInput(item)) {
      validItems.push(item);
    } else {
      console.warn('skipping invalid input item:', item);
    }
  }

  return validItems;
}