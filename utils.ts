interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * schema validation for incoming processor payloads
 */
export const validatePayload = (data: unknown): ValidationResult => {
  if (typeof data !== 'object' || data === null) {
    return { isValid: false, error: 'payload must be an object' };
  }

  const requiredFields = ['id', 'timestamp', 'payload'];
  for (const field of requiredFields) {
    if (!(field in data)) {
      return { isValid: false, error: `missing field: ${field}` };
    }
  }

  return { isValid: true };
};

/**
 * processor loop input sanitation
 */
export const processInput = (input: unknown): void => {
  const validation = validatePayload(input);

  if (!validation.isValid) {
    console.error(`validation failed: ${validation.error}`);
    return;
  }

  console.log('processing valid payload...');
};