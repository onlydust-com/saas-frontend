# Complete Feature Example

This document provides a complete example of implementing a feature following our hexagonal architecture pattern.

## Feature: Project Management

Let's create a complete example for a "project" feature.

### Step 1: Define Domain Contracts

```typescript
// domain/project/project-contract.types.ts
export type ProjectStatus = 'draft' | 'active' | 'completed' | 'archived';

export type ProjectData = {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
};

export type CreateProjectInput = {
  name: string;
  description: string;
  ownerId: string;
};

export type UpdateProjectInput = {
  id: string;
  name?: string;
  description?: string;
  status?: ProjectStatus;
};

export type ProjectSearchParams = {
  status?: ProjectStatus;
  ownerId?: string;
  page?: number;
  limit?: number;
  query?: string;
};
```

### Step 2: Create Domain Model

```typescript
// domain/project/models/project-model.ts
import { ProjectData, ProjectStatus } from '../project-contract.types';

export class ProjectModel {
  private readonly id: string;
  private name: string;
  private description: string;
  private status: ProjectStatus;
  private readonly createdAt: Date;
  private updatedAt: Date;
  private readonly ownerId: string;

  private constructor(props: {
    id: string;
    name: string;
    description: string;
    status: ProjectStatus;
    createdAt: Date;
    updatedAt: Date;
    ownerId: string;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.status = props.status;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.ownerId = props.ownerId;
    this.validate();
  }

  public static create(data: ProjectData): ProjectModel {
    return new ProjectModel({
      id: data.id,
      name: data.name,
      description: data.description,
      status: data.status,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
      ownerId: data.ownerId,
    });
  }

  public updateName(name: string): void {
    this.name = name;
    this.updatedAt = new Date();
    this.validate();
  }

  public updateDescription(description: string): void {
    this.description = description;
    this.updatedAt = new Date();
  }

  public updateStatus(status: ProjectStatus): void {
    this.status = status;
    this.updatedAt = new Date();
    this.validate();
  }

  public activate(): void {
    if (this.status === 'draft') {
      this.status = 'active';
      this.updatedAt = new Date();
    } else {
      throw new Error('Only draft projects can be activated');
    }
  }

  public complete(): void {
    if (this.status === 'active') {
      this.status = 'completed';
      this.updatedAt = new Date();
    } else {
      throw new Error('Only active projects can be completed');
    }
  }

  public archive(): void {
    if (this.status === 'completed') {
      this.status = 'archived';
      this.updatedAt = new Date();
    } else {
      throw new Error('Only completed projects can be archived');
    }
  }

  private validate(): void {
    if (!this.name || this.name.trim() === '') {
      throw new Error('Project name cannot be empty');
    }
    
    if (this.name.length > 100) {
      throw new Error('Project name cannot exceed 100 characters');
    }
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getStatus(): ProjectStatus {
    return this.status;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getOwnerId(): string {
    return this.ownerId;
  }

  public isOwner(userId: string): boolean {
    return this.ownerId === userId;
  }

  public toDTO(): ProjectData {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      status: this.status,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      ownerId: this.ownerId,
    };
  }
}
```

### Step 3: Define Storage Port

```typescript
// domain/project/outputs/project-storage-port.ts
import { ProjectModel } from '../models/project-model';
import { CreateProjectInput, UpdateProjectInput, ProjectSearchParams } from '../project-contract.types';
import { PaginatedResult } from '../../kernel/types';

export interface ProjectStoragePort {
  findById(id: string): Promise<ProjectModel | null>;
  search(params: ProjectSearchParams): Promise<PaginatedResult<ProjectModel>>;
  create(input: CreateProjectInput): Promise<ProjectModel>;
  update(input: UpdateProjectInput): Promise<ProjectModel>;
  delete(id: string): Promise<void>;
}
```

### Step 4: Define Facade Port

```typescript
// domain/project/inputs/project-facade-port.ts
import { ProjectData, CreateProjectInput, UpdateProjectInput, ProjectSearchParams } from '../project-contract.types';
import { PaginatedResult } from '../../kernel/types';

export interface ProjectFacadePort {
  getProjectById(id: string): Promise<ProjectData | null>;
  searchProjects(params: ProjectSearchParams): Promise<PaginatedResult<ProjectData>>;
  createProject(input: CreateProjectInput): Promise<ProjectData>;
  updateProject(input: UpdateProjectInput): Promise<ProjectData>;
  deleteProject(id: string): Promise<void>;
  activateProject(id: string): Promise<ProjectData>;
  completeProject(id: string): Promise<ProjectData>;
  archiveProject(id: string): Promise<ProjectData>;
}
```

### Step 5: Implement Storage Adapter

```typescript
// infrastructure/api-client-adapter/adapters/project-client-adapter.ts
import { ProjectStoragePort } from '../../../domain/project/outputs/project-storage-port';
import { ProjectModel } from '../../../domain/project/models/project-model';
import { CreateProjectInput, UpdateProjectInput, ProjectSearchParams, ProjectData } from '../../../domain/project/project-contract.types';
import { PaginatedResult } from '../../../kernel/types';
import { ApiClient } from '../api-client';

export class ProjectClientAdapter implements ProjectStoragePort {
  constructor(private readonly apiClient: ApiClient) {}

  async findById(id: string): Promise<ProjectModel | null> {
    try {
      const response = await this.apiClient.get<ProjectData>(`/projects/${id}`);
      return ProjectModel.create(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async search(params: ProjectSearchParams): Promise<PaginatedResult<ProjectModel>> {
    const response = await this.apiClient.get<PaginatedResult<ProjectData>>('/projects', {
      params,
    });
    
    return {
      ...response.data,
      items: response.data.items.map(item => ProjectModel.create(item)),
    };
  }

  async create(input: CreateProjectInput): Promise<ProjectModel> {
    const response = await this.apiClient.post<ProjectData>('/projects', input);
    return ProjectModel.create(response.data);
  }

  async update(input: UpdateProjectInput): Promise<ProjectModel> {
    const response = await this.apiClient.put<ProjectData>(`/projects/${input.id}`, input);
    return ProjectModel.create(response.data);
  }

  async delete(id: string): Promise<void> {
    await this.apiClient.delete(`/projects/${id}`);
  }
}
```

### Step 6: Implement Facade Adapter

```typescript
// infrastructure/facade-adapters/project-facade-adapter.ts
import { ProjectFacadePort } from '../../domain/project/inputs/project-facade-port';
import { ProjectStoragePort } from '../../domain/project/outputs/project-storage-port';
import { ProjectData, CreateProjectInput, UpdateProjectInput, ProjectSearchParams } from '../../domain/project/project-contract.types';
import { PaginatedResult } from '../../kernel/types';

export class ProjectFacadeAdapter implements ProjectFacadePort {
  constructor(private readonly projectStoragePort: ProjectStoragePort) {}

  async getProjectById(id: string): Promise<ProjectData | null> {
    const project = await this.projectStoragePort.findById(id);
    return project ? project.toDTO() : null;
  }

  async searchProjects(params: ProjectSearchParams): Promise<PaginatedResult<ProjectData>> {
    const result = await this.projectStoragePort.search(params);
    
    return {
      ...result,
      items: result.items.map(project => project.toDTO()),
    };
  }

  async createProject(input: CreateProjectInput): Promise<ProjectData> {
    const project = await this.projectStoragePort.create(input);
    return project.toDTO();
  }

  async updateProject(input: UpdateProjectInput): Promise<ProjectData> {
    const project = await this.projectStoragePort.update(input);
    return project.toDTO();
  }

  async deleteProject(id: string): Promise<void> {
    await this.projectStoragePort.delete(id);
  }

  async activateProject(id: string): Promise<ProjectData> {
    const project = await this.projectStoragePort.findById(id);
    if (!project) {
      throw new Error(`Project with ID ${id} not found`);
    }
    
    project.activate();
    await this.projectStoragePort.update({
      id,
      status: project.getStatus(),
    });
    
    return project.toDTO();
  }

  async completeProject(id: string): Promise<ProjectData> {
    const project = await this.projectStoragePort.findById(id);
    if (!project) {
      throw new Error(`Project with ID ${id} not found`);
    }
    
    project.complete();
    await this.projectStoragePort.update({
      id,
      status: project.getStatus(),
    });
    
    return project.toDTO();
  }

  async archiveProject(id: string): Promise<ProjectData> {
    const project = await this.projectStoragePort.findById(id);
    if (!project) {
      throw new Error(`Project with ID ${id} not found`);
    }
    
    project.archive();
    await this.projectStoragePort.update({
      id,
      status: project.getStatus(),
    });
    
    return project.toDTO();
  }
}
```

### Step 7: Create React Query Hooks

First, define query keys:

```typescript
// application/react-query-adapter/project/project-query-keys.ts
export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (filters: any) => [...projectKeys.lists(), filters] as const,
  details: () => [...projectKeys.all, 'detail'] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,
};
```

Get project hook:

```typescript
// application/react-query-adapter/project/client/use-get-project.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ProjectFacadePort } from '../../../../domain/project/inputs/project-facade-port';
import { ProjectData } from '../../../../domain/project/project-contract.types';
import { Bootstrap } from '../../../../bootstrap';
import { projectKeys } from '../project-query-keys';

export const useGetProject = (
  id: string,
  options?: UseQueryOptions<ProjectData | null>
) => {
  const projectFacadePort: ProjectFacadePort = Bootstrap.getInstance().getProjectFacadePort();

  return useQuery<ProjectData | null>({
    queryKey: projectKeys.detail(id),
    queryFn: () => projectFacadePort.getProjectById(id),
    ...options,
  });
};
```

Search projects hook:

```typescript
// application/react-query-adapter/project/client/use-search-projects.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ProjectFacadePort } from '../../../../domain/project/inputs/project-facade-port';
import { ProjectData, ProjectSearchParams } from '../../../../domain/project/project-contract.types';
import { PaginatedResult } from '../../../../kernel/types';
import { Bootstrap } from '../../../../bootstrap';
import { projectKeys } from '../project-query-keys';

export const useSearchProjects = (
  params: ProjectSearchParams,
  options?: UseQueryOptions<PaginatedResult<ProjectData>>
) => {
  const projectFacadePort: ProjectFacadePort = Bootstrap.getInstance().getProjectFacadePort();

  return useQuery<PaginatedResult<ProjectData>>({
    queryKey: projectKeys.list(params),
    queryFn: () => projectFacadePort.searchProjects(params),
    keepPreviousData: true,
    ...options,
  });
};
```

Create project hook:

```typescript
// application/react-query-adapter/project/client/use-create-project.ts
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { ProjectFacadePort } from '../../../../domain/project/inputs/project-facade-port';
import { ProjectData, CreateProjectInput } from '../../../../domain/project/project-contract.types';
import { Bootstrap } from '../../../../bootstrap';
import { projectKeys } from '../project-query-keys';

export const useCreateProject = (
  options?: UseMutationOptions<ProjectData, Error, CreateProjectInput>
) => {
  const queryClient = useQueryClient();
  const projectFacadePort: ProjectFacadePort = Bootstrap.getInstance().getProjectFacadePort();

  return useMutation<ProjectData, Error, CreateProjectInput>({
    mutationFn: (input: CreateProjectInput) => projectFacadePort.createProject(input),
    onSuccess: (data) => {
      // Invalidate project lists
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      // Add the new project to the cache
      queryClient.setQueryData(projectKeys.detail(data.id), data);
    },
    ...options,
  });
};
```

### Step 8: Add to Bootstrap

```typescript
// bootstrap/index.ts
import { ProjectFacadePort } from '../domain/project/inputs/project-facade-port';
import { ProjectStoragePort } from '../domain/project/outputs/project-storage-port';
import { ProjectFacadeAdapter } from '../infrastructure/facade-adapters/project-facade-adapter';
import { ProjectClientAdapter } from '../infrastructure/api-client-adapter/adapters/project-client-adapter';
import { ApiClient } from '../infrastructure/api-client-adapter/api-client';

export class Bootstrap {
  private static instance: Bootstrap;
  
  // Existing ports...
  private projectFacadePort: ProjectFacadePort;
  private projectStoragePort: ProjectStoragePort;
  
  private apiClient: ApiClient;
  
  private constructor() {
    // Initialize infrastructure
    this.apiClient = new ApiClient({
      baseURL: process.env.API_URL,
    });
    
    // Initialize existing ports...
    
    // Initialize project ports
    this.projectStoragePort = new ProjectClientAdapter(this.apiClient);
    this.projectFacadePort = new ProjectFacadeAdapter(this.projectStoragePort);
  }
  
  // ...existing methods
  
  public getProjectFacadePort(): ProjectFacadePort {
    return this.projectFacadePort;
  }
}
```

### Step 9: Use in React Components

```tsx
// components/ProjectList.tsx
import React from 'react';
import { useSearchProjects } from '../core/application/react-query-adapter/project/client/use-search-projects';
import { ProjectStatus } from '../core/domain/project/project-contract.types';

interface Props {
  status?: ProjectStatus;
  ownerId?: string;
}

export const ProjectList: React.FC<Props> = ({ status, ownerId }) => {
  const { data, isLoading, error } = useSearchProjects({
    status,
    ownerId,
    page: 1,
    limit: 10,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || data.items.length === 0) return <p>No projects found</p>;

  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {data.items.map(project => (
          <li key={project.id}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <p>Status: {project.status}</p>
          </li>
        ))}
      </ul>
      <div>
        Page {data.currentPage} of {data.totalPages}
      </div>
    </div>
  );
};
```

```tsx
// components/CreateProjectForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useCreateProject } from '../core/application/react-query-adapter/project/client/use-create-project';
import { CreateProjectInput } from '../core/domain/project/project-contract.types';

interface Props {
  ownerId: string;
  onSuccess?: () => void;
}

export const CreateProjectForm: React.FC<Props> = ({ ownerId, onSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateProjectInput>();
  const createProject = useCreateProject({
    onSuccess: () => {
      if (onSuccess) onSuccess();
    },
  });

  const onSubmit = (data: CreateProjectInput) => {
    createProject.mutate({ ...data, ownerId });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          {...register('description')}
        />
      </div>
      
      <button type="submit" disabled={createProject.isLoading}>
        {createProject.isLoading ? 'Creating...' : 'Create Project'}
      </button>
      
      {createProject.error && (
        <p>Error: {createProject.error.message}</p>
      )}
    </form>
  );
};
```