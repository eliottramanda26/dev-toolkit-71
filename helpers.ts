interface ProcessInput {
  id: string;
  value: number;
  timestamp: number;
}

/**
 * validates structure and constraints of input data
 * ensures values are within acceptable business ranges
 */
export const validateInput = (input: unknown): input is ProcessInput => {
  if (typeof input !== 'object' || input === null) return false;

  const { id, value, timestamp } = input as Record<string, unknown>;

  const isValidId = typeof id === 'string' && id.length > 0;
  const isValidValue = typeof value === 'number' && value >= 0 && value <= 1000;
  const isValidTimestamp = typeof timestamp === 'number' && timestamp > 0;

  return isValidId && isValidValue && isValidTimestamp;
};

/**
 * safe execution wrapper for the processing loop
 */
export const processWithValidation = (batch: unknown[], handler: (item: ProcessInput) => void): void => {
  for (const item of batch) {
    if (validateInput(item)) {
      handler(item);
    } else {
      console.error('validation failure for item:', item);
    }
  }
};