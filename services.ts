export interface RawInput {
  id: string;
  payload: unknown;
  retries?: number;
}

export interface ValidatedInput {
  id: string;
  payload: Record<string, unknown>;
  retries: number;
}

export class TaskProcessor {
  /** Validates raw input structure before execution */
  private validateInput(item: RawInput): ValidatedInput | null {
    if (!item || typeof item !== 'object') {
      return null;
    }

    if (typeof item.id !== 'string' || item.id.trim() === '') {
      return null;
    }

    if (!item.payload || typeof item.payload !== 'object' || Array.isArray(item.payload)) {
      return null;
    }

    const retries = typeof item.retries === 'number' && item.retries >= 0 ? item.retries : 0;

    return {
      id: item.id.trim(),
      payload: item.payload as Record<string, unknown>,
      retries,
    };
  }

  /** Main loop processing incoming tasks with strict validation */
  public async processBatch(items: RawInput[]): Promise<{ processed: number; failed: number }> {
    let processed = 0;
    let failed = 0;

    for (const rawItem of items) {
      // Validate input structure before execution
      const validated = this.validateInput(rawItem);
      if (!validated) {
        failed++;
        continue;
      }

      try {
        await this.executeTask(validated);
        processed++;
      } catch {
        failed++;
      }
    }

    return { processed, failed };
  }

  private async executeTask(item: ValidatedInput): Promise<void> {
    if (Object.keys(item.payload).length === 0) {
      throw new Error('Empty payload');
    }
  }
}
