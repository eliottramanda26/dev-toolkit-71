interface ProcessInput {
  id: string;
  payload: Record<string, unknown>;
  timestamp: number;
}

/**
 * Validates the structure and content of incoming process data
 */
export const validateInput = (input: unknown): input is ProcessInput => {
  if (typeof input !== 'object' || input === null) return false;

  const { id, payload, timestamp } = input as Record<string, unknown>;

  const isIdValid = typeof id === 'string' && id.length > 0;
  const isPayloadValid = typeof payload === 'object' && payload !== null;
  const isTimestampValid = typeof timestamp === 'number' && timestamp > 0;

  return isIdValid && isPayloadValid && isTimestampValid;
};

/**
 * Orchestrates data processing with strict validation checks
 */
export const processMainLoop = (data: unknown[]): void => {
  for (const entry of data) {
    if (!validateInput(entry)) {
      console.error('Invalid entry structure detected, skipping.');
      continue;
    }

    try {
      console.log(`Processing entry: ${entry.id}`);
      // Simulation of business logic execution
      const result = JSON.stringify(entry.payload);
      console.log(`Success: ${result.length} bytes processed`);
    } catch (err) {
      console.error(`Execution failure on ${entry.id}:`, err);
    }
  }
};