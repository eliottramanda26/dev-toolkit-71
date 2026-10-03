export interface ProcessItem {
  id: string;
  payload: Record<string, unknown>;
  priority?: number;
  timestamp?: number;
}

export interface ProcessResult<T = unknown> {
  id: string;
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Validates an incoming item structure before execution.
 */
export function validateItem(item: unknown): { valid: boolean; error?: string } {
  if (!item || typeof item !== 'object') {
    return { valid: false, error: 'Item must be a non-null object' };
  }
  const record = item as Partial<ProcessItem>;
  if (typeof record.id !== 'string' || record.id.trim() === '') {
    return { valid: false, error: 'Missing or invalid item ID' };
  }
  if (!record.payload || typeof record.payload !== 'object' || Array.isArray(record.payload)) {
    return { valid: false, error: 'Payload must be a valid object' };
  }
  if (record.priority !== undefined && (typeof record.priority !== 'number' || record.priority < 0)) {
    return { valid: false, error: 'Priority must be a non-negative number' };
  }
  return { valid: true };
}

/**
 * Processes a batch of raw input items with strict validation checks.
 */
export function processBatchItems(
  items: unknown[],
  handler: (item: ProcessItem) => unknown
): ProcessResult[] {
  const results: ProcessResult[] = [];

  for (let i = 0; i < items.length; i++) {
    const rawItem = items[i];
    const validation = validateItem(rawItem);

    if (!validation.valid) {
      const itemId = (rawItem as Partial<ProcessItem>)?.id ?? `index-${i}`;
      results.push({
        id: itemId,
        success: false,
        error: validation.error ?? 'Validation failed'
      });
      continue;
    }

    const validItem = rawItem as ProcessItem;
    try {
      const output = handler(validItem);
      results.push({ id: validItem.id, success: true, data: output });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Processing error';
      results.push({ id: validItem.id, success: false, error: message });
    }
  }

  return results;
}