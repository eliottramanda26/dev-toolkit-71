export interface DataRecord {
  id: string;
  value: unknown;
  timestamp: number;
}

/**
 * Safely parses and validates incoming data records
 */
export function sanitizeRecord(data: unknown): DataRecord | null {
  if (!data || typeof data !== 'object') {
    return null;
  }

  const record = data as Record<string, unknown>;

  if (typeof record.id !== 'string') {
    return null;
  }

  return {
    id: record.id,
    value: record.value ?? null,
    timestamp: typeof record.timestamp === 'number' ? record.timestamp : Date.now(),
  };
}

/**
 * Groups an array of records by a specific key prefix
 */
export function groupRecordsById(records: DataRecord[]): Record<string, DataRecord[]> {
  return records.reduce((acc, record) => {
    const prefix = record.id.split('-')[0] || 'unknown';
    if (!acc[prefix]) {
      acc[prefix] = [];
    }
    acc[prefix].push(record);
    return acc;
  }, {} as Record<string, DataRecord[]>);
}

/**
 * Filters out expired records based on threshold
 */
export function filterActiveRecords(records: DataRecord[], ttlMs: number): DataRecord[] {
  const now = Date.now();
  return records.filter((r) => now - r.timestamp < ttlMs);
}