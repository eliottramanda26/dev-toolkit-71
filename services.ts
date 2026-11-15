export interface DataRecord {
  id: string;
  timestamp: number;
  payload: Record<string, unknown>;
}

/**
 * Normalizes input data into a consistent record structure
 */
export function normalizeData(raw: unknown): DataRecord {
  if (typeof raw !== 'object' || raw === null) {
    throw new Error('Invalid input: data must be an object');
  }

  const entry = raw as Record<string, unknown>;

  return {
    id: (entry.id as string) || crypto.randomUUID(),
    timestamp: typeof entry.timestamp === 'number' ? entry.timestamp : Date.now(),
    payload: entry,
  };
}

/**
 * Sanitizes data by stripping sensitive keys defined in an exclusion list
 */
export function sanitizeData(
  data: Record<string, unknown>,
  sensitiveKeys: string[] = ['password', 'token', 'secret']
): Record<string, unknown> {
  const cleaned = { ...data };
  
  for (const key of sensitiveKeys) {
    if (key in cleaned) {
      delete cleaned[key];
    }
  }

  return cleaned;
}

/**
 * Batches data items into chunks for efficient processing
 */
export function chunkData<T>(data: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(data.length / size) }, (_, i) =>
    data.slice(i * size, i * size + size)
  );
}