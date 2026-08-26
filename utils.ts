export interface ProcessingItem {
  id: string;
  value: unknown;
  timestamp?: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validates a single item before processing in the main loop.
 * Ensures required properties exist and have correct types.
 */
export function validateProcessingItem(item: unknown): ValidationResult {
  const errors: string[] = [];

  if (!item || typeof item !== 'object') {
    return { isValid: false, errors: ['Item must be a non-null object'] };
  }

  const candidate = item as Record<string, unknown>;

  if (typeof candidate.id !== 'string' || candidate.id.trim() === '') {
    errors.push('Property "id" must be a non-empty string');
  }

  if (candidate.value === undefined || candidate.value === null) {
    errors.push('Property "value" cannot be null or undefined');
  }

  if (candidate.timestamp !== undefined && typeof candidate.timestamp !== 'number') {
    errors.push('Property "timestamp" must be a number when provided');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Main processing loop helper that filters invalid items.
 */
export function processValidItems<T>(
  items: unknown[],
  processor: (item: ProcessingItem) => T
): { results: T[]; droppedCount: number } {
  const results: T[] = [];
  let droppedCount = 0;

  for (const rawItem of items) {
    const validation = validateProcessingItem(rawItem);
    
    if (validation.isValid) {
      results.push(processor(rawItem as ProcessingItem));
    } else {
      droppedCount++;
    }
  }

  return { results, droppedCount };
}