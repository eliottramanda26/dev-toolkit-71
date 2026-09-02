export interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Creates a basic service with fetch capabilities
export function createService(baseUrl: string) {
  return {
    async fetchData<T>(path: string): Promise<ServiceResponse<T>> {
      try {
        const res = await fetch(`${baseUrl}/${path}`);
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        return { success: true, data };
      } catch (err) {
        return { success: false, error: (err as Error).message };
      }
    }
  };
}

// Debounce function to limit rapid calls
export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay);
  };
}

// Throttle function to limit execution rate
export function throttle<T extends (...args: any[]) => any>(fn: T, limit: number) {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Formats number as currency string
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}