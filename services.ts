interface ProcessingPayload {
  id: string;
  value: number;
  timestamp: number;
}

/**
 * Validates processing payloads to ensure data integrity
 */
export function validatePayload(data: unknown): data is ProcessingPayload {
  if (!data || typeof data !== 'object') return false;

  const { id, value, timestamp } = data as any;

  return (
    typeof id === 'string' &&
    typeof value === 'number' &&
    Number.isFinite(value) &&
    typeof timestamp === 'number' &&
    timestamp > 0
  );
}

/**
 * Main loop execution handler with strict validation
 */
export function processQueue(queue: unknown[]): void {
  for (const item of queue) {
    if (!validatePayload(item)) {
      console.warn('Invalid item skipped:', item);
      continue;
    }

    try {
      console.log(`Processing item ${item.id} with value ${item.value}`);
      // Processing logic would follow here
    } catch (error) {
      console.error(`Fatal error processing ${item.id}:`, error);
    }
  }
}