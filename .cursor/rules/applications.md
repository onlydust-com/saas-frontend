# Applications Rules

The application layer contains application-specific logic and adapters for frameworks.

## Application Layer Structure

```
/core/application/
├── react-query-adapter/            # Adapts domain logic to React Query
│   └── {feature}/
│       ├── client/
│       │   ├── use-get-{feature}.ts        # Query hook
│       │   ├── use-list-{features}.ts      # Query hook for lists
│       │   ├── use-create-{feature}.ts     # Mutation hook
│       │   ├── use-update-{feature}.ts     # Mutation hook
│       │   └── use-delete-{feature}.ts     # Mutation hook
│       └── {feature}-query-keys.ts         # Query keys for the feature
```

## React Query Hook Structure

### Query Key Definition

```typescript
// application/react-query-adapter/{feature}/{feature}-query-keys.ts
export const featureKeys = {
  all: ['features'] as const,
  lists: () => [...featureKeys.all, 'list'] as const,
  list: (filters: any) => [...featureKeys.lists(), filters] as const,
  details: () => [...featureKeys.all, 'detail'] as const,
  detail: (id: string) => [...featureKeys.details(), id] as const,
};
```

### Query Hook

```typescript
// application/react-query-adapter/{feature}/client/use-get-{feature}.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { FeatureFacadePort } from '../../../../domain/{feature}/inputs/{feature}-facade-port';
import { FeatureData } from '../../../../domain/{feature}/{feature}-contract.types';
import { Bootstrap } from '../../../../bootstrap';
import { featureKeys } from '../{feature}-query-keys';

export const useGetFeature = (
  id: string,
  options?: UseQueryOptions<FeatureData | null>
) => {
  const featureFacadePort: FeatureFacadePort = Bootstrap.getInstance().getFeatureFacadePort();

  return useQuery<FeatureData | null>({
    queryKey: featureKeys.detail(id),
    queryFn: () => featureFacadePort.getFeatureById(id),
    ...options,
  });
};
```

### Mutation Hook

```typescript
// application/react-query-adapter/{feature}/client/use-create-{feature}.ts
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { FeatureFacadePort } from '../../../../domain/{feature}/inputs/{feature}-facade-port';
import { FeatureData, CreateFeatureInput } from '../../../../domain/{feature}/{feature}-contract.types';
import { Bootstrap } from '../../../../bootstrap';
import { featureKeys } from '../{feature}-query-keys';

export const useCreateFeature = (
  options?: UseMutationOptions<FeatureData, Error, CreateFeatureInput>
) => {
  const queryClient = useQueryClient();
  const featureFacadePort: FeatureFacadePort = Bootstrap.getInstance().getFeatureFacadePort();

  return useMutation<FeatureData, Error, CreateFeatureInput>({
    mutationFn: (input: CreateFeatureInput) => featureFacadePort.createFeature(input),
    onSuccess: (data) => {
      // Invalidate feature lists
      queryClient.invalidateQueries({ queryKey: featureKeys.lists() });
      // Add the new feature to the cache
      queryClient.setQueryData(featureKeys.detail(data.id), data);
    },
    ...options,
  });
};
```

## Guidelines

1. Use framework-specific adapters to isolate domain logic from UI frameworks
2. Maintain consistent naming conventions across hooks
3. Properly handle loading, error, and success states
4. Use query invalidation for cache management
5. Group related hooks in feature-specific directories
6. Define query keys in a centralized location for each feature
7. Implement optimistic updates where appropriate
8. Handle pagination, filtering, and sorting in list queries
9. Document hook parameters and return values
10. Implement infinite queries for large data sets

## Advanced Query Example with Filtering and Pagination

```typescript
// application/react-query-adapter/user/client/use-search-users.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { UserFacadePort } from '../../../../domain/user/inputs/user-facade-port';
import { UserData, UserSearchParams } from '../../../../domain/user/{user}-contract.types';
import { PaginatedResult } from '../../../../kernel/types';
import { Bootstrap } from '../../../../bootstrap';
import { userKeys } from '../user-query-keys';

export const useSearchUsers = (
  params: UserSearchParams,
  options?: UseQueryOptions<PaginatedResult<UserData>>
) => {
  const userFacadePort: UserFacadePort = Bootstrap.getInstance().getUserFacadePort();

  return useQuery<PaginatedResult<UserData>>({
    queryKey: userKeys.list(params),
    queryFn: () => userFacadePort.searchUsers(params),
    keepPreviousData: true, // Keep previous data while fetching new data
    ...options,
  });
};
```

## Infinite Query Example

```typescript
// application/react-query-adapter/user/client/use-infinite-users.ts
import { useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { UserFacadePort } from '../../../../domain/user/inputs/user-facade-port';
import { UserData, UserSearchParams } from '../../../../domain/user/{user}-contract.types';
import { PaginatedResult } from '../../../../kernel/types';
import { Bootstrap } from '../../../../bootstrap';
import { userKeys } from '../user-query-keys';

export const useInfiniteUsers = (
  initialParams: Omit<UserSearchParams, 'page'>,
  options?: UseInfiniteQueryOptions<PaginatedResult<UserData>>
) => {
  const userFacadePort: UserFacadePort = Bootstrap.getInstance().getUserFacadePort();

  return useInfiniteQuery<PaginatedResult<UserData>>({
    queryKey: userKeys.infinite(initialParams),
    queryFn: ({ pageParam = 1 }) => 
      userFacadePort.searchUsers({ ...initialParams, page: pageParam }),
    getNextPageParam: (lastPage) => 
      lastPage.totalPages > lastPage.currentPage 
        ? lastPage.currentPage + 1 
        : undefined,
    ...options,
  });
};
```

## Form Integration Example

```typescript
// application/react-hook-form-adapter/user/use-user-form.ts
import { useForm, UseFormProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CreateUserInput } from '../../../domain/user/user-contract.types';

// Define validation schema using zod
const createUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  // other fields...
});

// Type for form values
export type CreateUserFormValues = z.infer<typeof createUserSchema>;

export const useCreateUserForm = (props?: UseFormProps<CreateUserFormValues>) => {
  return useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    mode: 'onBlur',
    ...props,
  });
};
```