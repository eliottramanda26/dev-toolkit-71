export interface MergeOptions {
  arrayStrategy?: 'replace' | 'concat' | 'combineUnique';
  skipUndefined?: boolean;
}

type GenericObject = Record<string, any>;

function isObject(item: unknown): item is GenericObject {
  return item !== null && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Deeply merges target and source objects based on configurable strategies.
 */
export function deepMerge<T extends GenericObject>(options: MergeOptions, target: T, ...sources: Partial<T>[]): T;
export function deepMerge<T extends GenericObject>(target: T, ...sources: Partial<T>[]): T;
export function deepMerge(first: any, ...rest: any[]): GenericObject {
  let options: MergeOptions = { arrayStrategy: 'concat', skipUndefined: true };
  let target: GenericObject;
  let sources: GenericObject[];

  if (first && ('arrayStrategy' in first || 'skipUndefined' in first)) {
    options = { ...options, ...first };
    target = rest[0] ? { ...rest[0] } : {};
    sources = rest.slice(1);
  } else {
    target = first ? { ...first } : {};
    sources = rest;
  }

  for (const source of sources) {
    if (!isObject(source)) continue;

    for (const key of Object.keys(source)) {
      const sourceVal = source[key];
      const targetVal = target[key];

      if (options.skipUndefined && sourceVal === undefined) {
        continue;
      }

      if (Array.isArray(targetVal) && Array.isArray(sourceVal)) {
        if (options.arrayStrategy === 'replace') {
          target[key] = [...sourceVal];
        } else if (options.arrayStrategy === 'combineUnique') {
          target[key] = Array.from(new Set([...targetVal, ...sourceVal]));
        } else {
          target[key] = [...targetVal, ...sourceVal];
        }
      } else if (isObject(targetVal) && isObject(sourceVal)) {
        target[key] = deepMerge(options, targetVal, sourceVal);
      } else {
        target[key] = sourceVal;
      }
    }
  }

  return target;
}
