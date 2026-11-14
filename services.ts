export interface DataItem {
  id: string;
  payload: Record<string, unknown>;
  timestamp: number;
}

export interface ServiceResponse<T> {
  success: boolean;
  data: T | null;
  error: string | null;
}

/**
 * Processes a data item and performs validation checks
 * @param item The data structure to process
 */
export const processDataItem = (item: DataItem): ServiceResponse<string> => {
  if (!item.id) {
    return { success: false, data: null, error: 'Invalid ID provided' };
  }

  try {
    const result: string = JSON.stringify(item.payload);
    return { success: true, data: `Processed ${item.id}: ${result}`, error: null };
  } catch (err) {
    return { success: false, data: null, error: 'Serialization failure' };
  }
};

/**
 * Fetches multiple items and returns a batch summary
 * @param items Array of data items to transform
 */
export const batchProcessItems = (items: DataItem[]): string[] => {
  return items.map((i) => `ID-${i.id}`).filter((id): id is string => !!id);
};