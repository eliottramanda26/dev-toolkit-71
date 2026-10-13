interface ProcessInput {
  id: string;
  value: number;
  timestamp: number;
}

/**
 * Validates the schema and business logic for incoming data
 */
export function validateInput(data: unknown): data is ProcessInput {
  if (!data || typeof data !== 'object') return false;

  const input = data as Partial<ProcessInput>;
  
  return (
    typeof input.id === 'string' &&
    typeof input.value === 'number' &&
    !isNaN(input.value) &&
    typeof input.timestamp === 'number' &&
    input.timestamp > 0
  );
}

/**
 * Processing loop with integrated validation checks
 */
export function processBatch(items: unknown[]): void {
  for (const item of items) {
    if (!validateInput(item)) {
      console.error('invalid record format detected, skipping');
      continue;
    }

    try {
      const { id, value } = item;
      console.log(`processing item ${id} with value ${value}`);
    } catch (err) {
      console.error(`fatal error during batch processing: ${err}`);
    }
  }
}