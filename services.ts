export interface ProcessRequest {
  id: string;
  payload: unknown;
  timestamp: number;
}

export const validateRequest = (req: unknown): req is ProcessRequest => {
  if (typeof req !== 'object' || req === null) return false;
  const candidate = req as Record<string, unknown>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.timestamp === 'number' &&
    candidate.payload !== undefined
  );
};

/**
 * core loop handler for dev-toolkit-71
 */
export const runProcessingLoop = (data: unknown[]): void => {
  for (const item of data) {
    if (!validateRequest(item)) {
      console.warn('Invalid item skipped during processing:', item);
      continue;
    }

    try {
      console.log(`Processing item ${item.id} at ${item.timestamp}`);
      // process business logic here
    } catch (error) {
      console.error(`Execution failure for ${item.id}:`, error);
    }
  }
};

// example usage
runProcessingLoop([{ id: 'task-01', payload: 'test', timestamp: Date.now() }, null]);