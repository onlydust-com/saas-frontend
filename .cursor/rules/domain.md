# Domain Rules

Domains are the core of the business logic in our hexagonal architecture.

## Domain Structure

A well-organized domain should:

```
/core/domain/{feature-name}/
├── {feature}-contract.types.ts     # Type definitions for the domain
├── models/                         # Domain models
│   └── {feature}-model.ts          # Core business entity
├── inputs/                         # Inbound ports (facades)
│   └── {feature}-facade-port.ts    # Interface for accessing domain functionality
└── outputs/                        # Outbound ports (storage)
    └── {feature}-storage-port.ts   # Interface for persistence
```

## Guidelines

1. Keep domains isolated from other domains
2. Domain models should be rich with business logic
3. Use factories for creating domain models
4. Define clear contracts through interfaces
5. Domains should not depend on infrastructure

## Type Definitions

```typescript
// {feature}-contract.types.ts
export type FeatureData = {
  id: string;
  name: string;
  // other properties...
};

export type CreateFeatureInput = {
  name: string;
  // other properties...
};

export type UpdateFeatureInput = {
  id: string;
  // properties that can be updated...
};
```

## Domain Model

```typescript
// models/{feature}-model.ts
import { FeatureData } from '../{feature}-contract.types';

export class FeatureModel {
  private readonly id: string;
  private name: string;
  // other properties...

  private constructor(props: { id: string; name: string; /*...*/ }) {
    this.id = props.id;
    this.name = props.name;
    // initialize other properties...
  }

  // Factory method
  public static create(data: FeatureData): FeatureModel {
    return new FeatureModel({
      id: data.id,
      name: data.name,
      // other properties...
    });
  }

  // Business methods
  public updateName(name: string): void {
    this.name = name;
    // business logic...
  }

  // Accessor methods
  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  // Convert to data transfer object
  public toDTO(): FeatureData {
    return {
      id: this.id,
      name: this.name,
      // other properties...
    };
  }
}
```

## Facade Port

```typescript
// inputs/{feature}-facade-port.ts
import { FeatureData, CreateFeatureInput, UpdateFeatureInput } from '../{feature}-contract.types';

export interface FeatureFacadePort {
  getFeatureById(id: string): Promise<FeatureData | null>;
  listFeatures(): Promise<FeatureData[]>;
  createFeature(input: CreateFeatureInput): Promise<FeatureData>;
  updateFeature(input: UpdateFeatureInput): Promise<FeatureData>;
  deleteFeature(id: string): Promise<void>;
}
```

## Storage Port

```typescript
// outputs/{feature}-storage-port.ts
import { FeatureData, CreateFeatureInput, UpdateFeatureInput } from '../{feature}-contract.types';
import { FeatureModel } from '../models/{feature}-model';

export interface FeatureStoragePort {
  findById(id: string): Promise<FeatureModel | null>;
  findAll(): Promise<FeatureModel[]>;
  save(feature: FeatureModel): Promise<void>;
  create(input: CreateFeatureInput): Promise<FeatureModel>;
  update(input: UpdateFeatureInput): Promise<FeatureModel>;
  delete(id: string): Promise<void>;
}
```