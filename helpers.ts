/**
 * Utility collection for dev-toolkit-71
 */

export interface DevEntity {
  id: string;
  timestamp: number;
  metadata: Record<string, unknown>;
}

/**
 * Normalizes entity timestamps and validates presence
 */
export const normalizeEntities = (entities: DevEntity[]): DevEntity[] => {
  if (!Array.isArray(entities)) return [];

  return entities.map((entity) => ({
    ...entity,
    timestamp: entity.timestamp || Date.now(),
  }));
};

/**
 * Safely extracts metadata fields
 */
export const getMetadataValue = <T = unknown>(
  entity: DevEntity,
  key: string
): T | undefined => {
  return entity.metadata?.[key] as T | undefined;
};

/**
 * Groups entities by a specific metadata key
 */
export const groupByMetadata = (
  entities: DevEntity[],
  key: string
): Record<string, DevEntity[]> => {
  return entities.reduce((acc, entity) => {
    const val = String(entity.metadata?.[key] ?? 'undefined');
    if (!acc[val]) {
      acc[val] = [];
    }
    acc[val].push(entity);
    return acc;
  }, {} as Record<string, DevEntity[]>);
};