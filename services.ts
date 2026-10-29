interface ProcessInput {
  id: string;
  payload: Record<string, unknown>;
  timestamp: number;
}

const isValidInput = (input: unknown): input is ProcessInput => {
  if (typeof input !== 'object' || input === null) return false;
  const { id, payload, timestamp } = input as Record<string, unknown>;
  return (
    typeof id === 'string' &&
    id.length > 0 &&
    typeof payload === 'object' &&
    typeof timestamp === 'number' &&
    !isNaN(timestamp)
  );
};

/**
 * Main processing loop with input validation
 */
export async function runProcessor(queue: unknown[]): Promise<void> {
  for (const item of queue) {
    if (!isValidInput(item)) {
      console.error('Invalid input encountered, skipping item:', item);
      continue;
    }

    try {
      console.log(`Processing item ${item.id} at ${new Date(item.timestamp).toISOString()}`);
      // Logic implementation would follow here
    } catch (err) {
      console.error('Processing error for item:', item.id, err);
    }
  }
}