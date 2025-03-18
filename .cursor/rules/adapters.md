# Adapters Rules

Adapters implement the ports defined in the domain layer, connecting the domain to external systems or frameworks.

## Types of Adapters

1. **Storage Adapters**: Implement storage ports for persistence (e.g., API clients, local storage)
2. **Facade Adapters**: Implement facade ports for business operations
3. **Framework Adapters**: Adapt domain logic to specific frameworks (e.g., React Query)

## Storage Adapter Structure

```typescript
// infrastructure/api-client-adapter/adapters/{feature}-client-adapter.ts
import { FeatureStoragePort } from '../../../domain/{feature}/outputs/{feature}-storage-port';
import { FeatureModel } from '../../../domain/{feature}/models/{feature}-model';
import { CreateFeatureInput, UpdateFeatureInput, FeatureData } from '../../../domain/{feature}/{feature}-contract.types';
import { ApiClient } from '../api-client';

export class FeatureClientAdapter implements FeatureStoragePort {
  constructor(private readonly apiClient: ApiClient) {}

  async findById(id: string): Promise<FeatureModel | null> {
    try {
      const response = await this.apiClient.get<FeatureData>(`/features/${id}`);
      return FeatureModel.create(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  // Other methods implementing the storage port...
}
```

## Facade Adapter Structure

```typescript
// infrastructure/facade-adapters/{feature}-facade-adapter.ts
import { FeatureFacadePort } from '../../domain/{feature}/inputs/{feature}-facade-port';
import { FeatureStoragePort } from '../../domain/{feature}/outputs/{feature}-storage-port';
import { FeatureData, CreateFeatureInput, UpdateFeatureInput } from '../../domain/{feature}/{feature}-contract.types';

export class FeatureFacadeAdapter implements FeatureFacadePort {
  constructor(private readonly featureStoragePort: FeatureStoragePort) {}

  async getFeatureById(id: string): Promise<FeatureData | null> {
    const feature = await this.featureStoragePort.findById(id);
    return feature ? feature.toDTO() : null;
  }

  // Other methods implementing the facade port...
}
```

## React Query Adapter Structure

```typescript
// application/react-query-adapter/{feature}/client/use-get-feature.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { FeatureFacadePort } from '../../../../domain/{feature}/inputs/{feature}-facade-port';
import { FeatureData } from '../../../../domain/{feature}/{feature}-contract.types';
import { Bootstrap } from '../../../../bootstrap';

export const featureKeys = {
  all: ['features'] as const,
  details: (id: string) => [...featureKeys.all, id] as const,
};

export const useGetFeature = (
  id: string,
  options?: UseQueryOptions<FeatureData | null>
) => {
  const featureFacadePort: FeatureFacadePort = Bootstrap.getInstance().getFeatureFacadePort();

  return useQuery<FeatureData | null>({
    queryKey: featureKeys.details(id),
    queryFn: () => featureFacadePort.getFeatureById(id),
    ...options,
  });
};
```

## Guidelines

1. Each adapter should implement exactly one port
2. Adapters should handle infrastructure-specific concerns (API calls, caching, etc.)
3. Error handling should translate between domain and infrastructure layers
4. Keep adapters focused on a single responsibility
5. Use dependency injection for external dependencies
6. Create mock adapters for testing
7. Consider implementing retry and circuit breaking for external systems
8. Framework adapters should isolate framework-specific code
9. Document rate limits, timeouts, and other constraints
10. Use typed responses for API clients

## Mock Adapter Example

```typescript
// infrastructure/mock-adapters/{feature}-adapter-mock.ts
import { FeatureStoragePort } from '../../domain/{feature}/outputs/{feature}-storage-port';
import { FeatureModel } from '../../domain/{feature}/models/{feature}-model';
import { CreateFeatureInput, UpdateFeatureInput, FeatureData } from '../../domain/{feature}/{feature}-contract.types';

export class FeatureStoragePortMock implements FeatureStoragePort {
  private features: Map<string, FeatureModel> = new Map();

  async findById(id: string): Promise<FeatureModel | null> {
    return this.features.get(id) || null;
  }

  async findAll(): Promise<FeatureModel[]> {
    return Array.from(this.features.values());
  }

  async save(feature: FeatureModel): Promise<void> {
    this.features.set(feature.getId(), feature);
  }

  async create(input: CreateFeatureInput): Promise<FeatureModel> {
    const id = `mock-id-${Date.now()}`;
    const data: FeatureData = {
      id,
      name: input.name,
      // other properties...
    };
    const feature = FeatureModel.create(data);
    this.features.set(id, feature);
    return feature;
  }

  async update(input: UpdateFeatureInput): Promise<FeatureModel> {
    const existing = await this.findById(input.id);
    if (!existing) {
      throw new Error(`Feature with ID ${input.id} not found`);
    }
    
    // Create updated model with new data
    const data: FeatureData = {
      ...existing.toDTO(),
      ...input,
    };
    
    const updated = FeatureModel.create(data);
    this.features.set(input.id, updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    this.features.delete(id);
  }

  // For testing purposes
  reset(): void {
    this.features.clear();
  }

  seedData(features: FeatureModel[]): void {
    features.forEach(feature => {
      this.features.set(feature.getId(), feature);
    });
  }
}
```