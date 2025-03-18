# Facades Rules

Facades are inbound ports that expose domain functionality to the outside world.

## Facade Port Structure

A facade port should define methods for all actions that can be performed on a domain:

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

## Facade Adapter Implementation

```typescript
// infrastructure/feature-facade-adapter.ts
import { FeatureFacadePort } from '../domain/{feature}/inputs/{feature}-facade-port';
import { FeatureStoragePort } from '../domain/{feature}/outputs/{feature}-storage-port';
import { FeatureData, CreateFeatureInput, UpdateFeatureInput } from '../domain/{feature}/{feature}-contract.types';
import { FeatureModel } from '../domain/{feature}/models/{feature}-model';

export class FeatureFacadeAdapter implements FeatureFacadePort {
  constructor(private readonly featureStoragePort: FeatureStoragePort) {}

  async getFeatureById(id: string): Promise<FeatureData | null> {
    const feature = await this.featureStoragePort.findById(id);
    return feature ? feature.toDTO() : null;
  }

  async listFeatures(): Promise<FeatureData[]> {
    const features = await this.featureStoragePort.findAll();
    return features.map(feature => feature.toDTO());
  }

  async createFeature(input: CreateFeatureInput): Promise<FeatureData> {
    const feature = await this.featureStoragePort.create(input);
    return feature.toDTO();
  }

  async updateFeature(input: UpdateFeatureInput): Promise<FeatureData> {
    const feature = await this.featureStoragePort.update(input);
    return feature.toDTO();
  }

  async deleteFeature(id: string): Promise<void> {
    await this.featureStoragePort.delete(id);
  }
}
```

## Guidelines

1. Facade ports should only expose DTO objects, not domain models
2. Methods should be named clearly to describe the action being performed
3. Every method should return a Promise (for async consistency)
4. Input parameters should be strongly typed
5. Use appropriate error handling and validation
6. Facade implementations should delegate to domain services
7. Keep facade methods focused on a single responsibility
8. Consider using command/query separation
9. Document public methods with JSDoc comments
10. Facade interfaces should be simple and focused on user intent

## Advanced Facade Example

For more complex facades with additional functionality:

```typescript
// inputs/user-facade-port.ts
import { UserData, CreateUserInput, UpdateUserInput, UserSearchParams } from '../user-contract.types';
import { PaginatedResult } from '../../kernel/types';

export interface UserFacadePort {
  /**
   * Get a user by ID
   * @param id The user ID
   * @returns The user data or null if not found
   */
  getUserById(id: string): Promise<UserData | null>;
  
  /**
   * Search for users with optional filtering and pagination
   * @param params Search parameters
   * @returns Paginated results
   */
  searchUsers(params: UserSearchParams): Promise<PaginatedResult<UserData>>;
  
  /**
   * Create a new user
   * @param input User creation input
   * @returns The created user data
   */
  createUser(input: CreateUserInput): Promise<UserData>;
  
  /**
   * Update an existing user
   * @param input User update input
   * @returns The updated user data
   * @throws Error if user not found
   */
  updateUser(input: UpdateUserInput): Promise<UserData>;
  
  /**
   * Delete a user
   * @param id The user ID
   * @returns void
   * @throws Error if user not found
   */
  deleteUser(id: string): Promise<void>;
  
  /**
   * Add a role to a user
   * @param userId User ID
   * @param roleId Role ID
   * @returns Updated user data
   */
  addRoleToUser(userId: string, roleId: string): Promise<UserData>;
  
  /**
   * Remove a role from a user
   * @param userId User ID
   * @param roleId Role ID
   * @returns Updated user data
   */
  removeRoleFromUser(userId: string, roleId: string): Promise<UserData>;
}
```