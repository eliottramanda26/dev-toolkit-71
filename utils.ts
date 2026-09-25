export class AppError extends Error {
  constructor(public message: string, public code: string, public status: number = 500) {
    super(message);
    this.name = 'AppError';
  }
}

export const safeExecute = async <T>(fn: () => Promise<T>): Promise<T | null> => {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof AppError) {
      console.error(`[${error.code}] ${error.message}`);
    } else if (error instanceof Error) {
      console.error(`[UNKNOWN_ERROR] ${error.message}`);
    }
    return null;
  }
};

export const validateConfig = (config: Record<string, unknown>): void => {
  if (!config || Object.keys(config).length === 0) {
    throw new AppError('Empty configuration provided', 'INVALID_CONFIG', 400);
  }
};

export const retryOperation = async <T>(
  fn: () => Promise<T>,
  retries: number = 3
): Promise<T> => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries - 1) throw err;
    }
  }
  throw new AppError('Operation failed after retries', 'RETRY_LIMIT_EXCEEDED');
};