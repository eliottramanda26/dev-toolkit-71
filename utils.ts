export class DevToolkitError extends Error {
  constructor(public message: string, public code: string, public status: number = 500) {
    super(message);
    this.name = 'DevToolkitError';
  }
}

export function safeParseJson<T>(data: string, fallback: T): T {
  try {
    return JSON.parse(data) as T;
  } catch (err) {
    console.error('Failed to parse JSON, returning fallback:', err);
    return fallback;
  }
}

export async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new DevToolkitError('Operation timed out', 'TIMEOUT', 408)), ms)
  );
  return Promise.race([promise, timeout]);
}

export function validateInput(input: unknown): asserts input is Record<string, any> {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new DevToolkitError('Invalid input format', 'VALIDATION_ERROR', 400);
  }
}