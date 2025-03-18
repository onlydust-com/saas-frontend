# Storage Rules

Storage ports define the outbound interfaces for persistence and external data access.

## Storage Port Structure

A storage port should define methods for all data operations:

```typescript
// outputs/{feature}-storage-port.ts
import { FeatureModel } from '../models/{feature}-model';
import { CreateFeatureInput, UpdateFeatureInput } from '../{feature}-contract.types';

export interface FeatureStoragePort {
  findById(id: string): Promise<FeatureModel | null>;
  findAll(): Promise<FeatureModel[]>;
  save(feature: FeatureModel): Promise<void>;
  create(input: CreateFeatureInput): Promise<FeatureModel>;
  update(input: UpdateFeatureInput): Promise<FeatureModel>;
  delete(id: string): Promise<void>;
}
```

## Storage Adapter Implementation

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

  async findAll(): Promise<FeatureModel[]> {
    const response = await this.apiClient.get<FeatureData[]>('/features');
    return response.data.map(data => FeatureModel.create(data));
  }

  async save(feature: FeatureModel): Promise<void> {
    await this.apiClient.put(`/features/${feature.getId()}`, feature.toDTO());
  }

  async create(input: CreateFeatureInput): Promise<FeatureModel> {
    const response = await this.apiClient.post<FeatureData>('/features', input);
    return FeatureModel.create(response.data);
  }

  async update(input: UpdateFeatureInput): Promise<FeatureModel> {
    const response = await this.apiClient.put<FeatureData>(`/features/${input.id}`, input);
    return FeatureModel.create(response.data);
  }

  async delete(id: string): Promise<void> {
    await this.apiClient.delete(`/features/${id}`);
  }
}
```

## Guidelines

1. Storage ports should return domain models, not DTOs
2. Methods should be named to reflect repository/persistence operations
3. Every method should return a Promise (for async consistency)
4. Storage adapters should handle infrastructure-specific concerns
5. Error handling should translate infrastructure errors to domain exceptions
6. Consider implementing caching where appropriate
7. Use pagination for large collections
8. Document error behaviors and edge cases
9. Consider bulk operations for performance
10. Create mock implementations for testing

## Advanced Storage Port Example

For more complex storage needs with filtering and pagination:

```typescript
// outputs/user-storage-port.ts
import { UserModel } from '../models/user-model';
import { CreateUserInput, UpdateUserInput, UserSearchParams } from '../user-contract.types';
import { PaginatedResult } from '../../kernel/types';

export interface UserStoragePort {
  /**
   * Find a user by ID
   * @param id The user ID
   * @returns The user model or null if not found
   */
  findById(id: string): Promise<UserModel | null>;
  
  /**
   * Find users by email
   * @param email Email to search for
   * @returns User models matching the email
   */
  findByEmail(email: string): Promise<UserModel | null>;
  
  /**
   * Search for users with filtering and pagination
   * @param params Search parameters
   * @returns Paginated user models
   */
  search(params: UserSearchParams): Promise<PaginatedResult<UserModel>>;
  
  /**
   * Save an existing user model
   * @param user User model to save
   */
  save(user: UserModel): Promise<void>;
  
  /**
   * Create a new user
   * @param input User creation input
   * @returns Created user model
   */
  create(input: CreateUserInput): Promise<UserModel>;
  
  /**
   * Update an existing user
   * @param input User update input
   * @returns Updated user model
   * @throws Error if user not found
   */
  update(input: UpdateUserInput): Promise<UserModel>;
  
  /**
   * Delete a user
   * @param id User ID
   * @throws Error if user not found
   */
  delete(id: string): Promise<void>;
  
  /**
   * Add a role to a user
   * @param userId User ID
   * @param roleId Role ID
   * @returns Updated user model
   */
  addRoleToUser(userId: string, roleId: string): Promise<UserModel>;
  
  /**
   * Remove a role from a user
   * @param userId User ID
   * @param roleId Role ID
   * @returns Updated user model
   */
  removeRoleFromUser(userId: string, roleId: string): Promise<UserModel>;
}
```