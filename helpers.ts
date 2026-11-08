/**
 * Memoizes function results for improved core module throughput
 */
export function memoize<T, R>(fn: (arg: T) => R): (arg: T) => R {
  const cache = new Map<T, R>();
  return (arg: T): R => {
    if (cache.has(arg)) {
      return cache.get(arg)!;
    }
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}

/**
 * Batches operation execution to reduce overhead
 */
export function debounce<F extends (...args: any[]) => void>(fn: F, delay: number): (...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<F>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Optimized data lookup structure for core entities
 */
export class EntityRegistry<T extends { id: string }> {
  private registry: Map<string, T> = new Map();

  add(item: T): void {
    this.registry.set(item.id, item);
  }

  get(id: string): T | undefined {
    return this.registry.get(id);
  }

  toArray(): T[] {
    return Array.from(this.registry.values());
  }
}