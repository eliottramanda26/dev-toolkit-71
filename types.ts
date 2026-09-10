export interface ProcessingConfig {
  maxRetries: number;
  timeoutMs: number;
}

export interface ProcessableInput {
  id: string;
  payload: Record<string, unknown>;
  timestamp: number;
}

export function validateInput(input: unknown): input is ProcessableInput {
  if (typeof input !== 'object' || input === null) return false;
  const data = input as Record<string, unknown>;

  return (
    typeof data.id === 'string' &&
    typeof data.timestamp === 'number' &&
    typeof data.payload === 'object' &&
    data.payload !== null
  );
}

export function processLoop(items: unknown[]): void {
  for (const item of items) {
    if (!validateInput(item)) {
      console.error(`Invalid input schema detected for item: ${JSON.stringify(item)}`);
      continue;
    }

    try {
      console.log(`Processing item ${item.id} at ${item.timestamp}`);
    } catch (err) {
      console.error(`Execution failure on item ${item.id}:`, err);
    }
  }
}