interface ProcessInput {
  id: string;
  value: number;
}

/**
 * Validates processing inputs against business rules
 */
const validateInput = (input: ProcessInput): boolean => {
  if (typeof input.id !== 'string' || input.id.length === 0) return false;
  if (typeof input.value !== 'number' || input.value < 0) return false;
  return true;
};

/**
 * Main processing loop with integrated validation logic
 */
export const processData = (items: ProcessInput[]): void => {
  console.log(`Starting processing for ${items.length} items`);

  for (const item of items) {
    if (!validateInput(item)) {
      console.error(`Skipping invalid item: ${JSON.stringify(item)}`);
      continue;
    }

    try {
      // Simulate core business logic execution
      const result = item.value * 2;
      console.log(`Processed item ${item.id}: result ${result}`);
    } catch (err) {
      console.error(`Critical failure on item ${item.id}:`, err);
    }
  }
};

export const runBatch = (data: unknown[]): void => {
  const validItems = data.filter((item): item is ProcessInput => {
    return (item as ProcessInput).id !== undefined;
  });
  processData(validItems);
};