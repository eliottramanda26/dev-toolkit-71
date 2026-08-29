// Debounce function to limit the rate of function calls
export function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Throttle function to ensure function is called at most once per limit
export function throttle<T extends (...args: any[]) => void>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Deep clone for objects and arrays
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as T;
  }
  const clonedObj: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = deepClone((obj as any)[key]);
    }
  }
  return clonedObj;
}

// Check if value is empty
export function isEmpty(value: unknown): boolean {
  if (value == null) {
    return true;
  }
  if (typeof value === "string" || Array.isArray(value)) {
    return (value as any).length === 0;
  }
  if (typeof value === "object") {
    return Object.keys(value).length === 0;
  }
  return false;
}

// Capitalize first letter of string
export function capitalize(str: string): string {
  if (!str || typeof str !== "string") return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}