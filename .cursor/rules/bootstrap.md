# Bootstrap Rules

The bootstrap module handles dependency injection and application initialization.

## Bootstrap Structure

```typescript
// bootstrap/index.ts
import { FeatureFacadePort } from '../domain/feature/inputs/feature-facade-port';
import { FeatureStoragePort } from '../domain/feature/outputs/feature-storage-port';
import { FeatureFacadeAdapter } from '../infrastructure/facade-adapters/feature-facade-adapter';
import { FeatureClientAdapter } from '../infrastructure/api-client-adapter/adapters/feature-client-adapter';
import { ApiClient } from '../infrastructure/api-client-adapter/api-client';

export class Bootstrap {
  private static instance: Bootstrap;
  
  // Ports
  private featureFacadePort: FeatureFacadePort;
  private featureStoragePort: FeatureStoragePort;
  
  // Infrastructure
  private apiClient: ApiClient;
  
  private constructor() {
    // Initialize infrastructure
    this.apiClient = new ApiClient({
      baseURL: process.env.API_URL,
      // other config...
    });
    
    // Initialize storage ports
    this.featureStoragePort = new FeatureClientAdapter(this.apiClient);
    
    // Initialize facade ports
    this.featureFacadePort = new FeatureFacadeAdapter(this.featureStoragePort);
  }
  
  public static getInstance(): Bootstrap {
    if (!Bootstrap.instance) {
      Bootstrap.instance = new Bootstrap();
    }
    return Bootstrap.instance;
  }
  
  // Facade port accessors
  public getFeatureFacadePort(): FeatureFacadePort {
    return this.featureFacadePort;
  }
  
  // For testing
  public static reset(): void {
    Bootstrap.instance = null;
  }
  
  // For testing with mock adapters
  public static createTestInstance(options: {
    featureStoragePort?: FeatureStoragePort;
  }): Bootstrap {
    const instance = new Bootstrap();
    
    if (options.featureStoragePort) {
      instance.featureStoragePort = options.featureStoragePort;
      instance.featureFacadePort = new FeatureFacadeAdapter(options.featureStoragePort);
    }
    
    Bootstrap.instance = instance;
    return instance;
  }
}
```

## Factory Pattern

For larger applications, consider using factories:

```typescript
// bootstrap/factories/feature-factory.ts
import { FeatureFacadePort } from '../../domain/feature/inputs/feature-facade-port';
import { FeatureStoragePort } from '../../domain/feature/outputs/feature-storage-port';
import { FeatureFacadeAdapter } from '../../infrastructure/facade-adapters/feature-facade-adapter';
import { FeatureClientAdapter } from '../../infrastructure/api-client-adapter/adapters/feature-client-adapter';
import { ApiClient } from '../../infrastructure/api-client-adapter/api-client';

export class FeatureFactory {
  public static createStoragePort(apiClient: ApiClient): FeatureStoragePort {
    return new FeatureClientAdapter(apiClient);
  }
  
  public static createFacadePort(featureStoragePort: FeatureStoragePort): FeatureFacadePort {
    return new FeatureFacadeAdapter(featureStoragePort);
  }
}
```

Then use it in bootstrap:

```typescript
// bootstrap/index.ts
import { FeatureFactory } from './factories/feature-factory';

export class Bootstrap {
  // ...
  
  private constructor() {
    // Initialize infrastructure
    this.apiClient = new ApiClient({
      baseURL: process.env.API_URL,
    });
    
    // Initialize storage ports
    this.featureStoragePort = FeatureFactory.createStoragePort(this.apiClient);
    
    // Initialize facade ports
    this.featureFacadePort = FeatureFactory.createFacadePort(this.featureStoragePort);
  }
  
  // ...
}
```

## Environment Configuration

```typescript
// bootstrap/config.ts
export interface Config {
  api: {
    baseURL: string;
    timeout: number;
  };
  auth: {
    domain: string;
    clientId: string;
  };
  features: {
    enableNewUI: boolean;
  };
}

export const loadConfig = (): Config => {
  return {
    api: {
      baseURL: process.env.API_URL || 'http://localhost:3000',
      timeout: parseInt(process.env.API_TIMEOUT || '30000', 10),
    },
    auth: {
      domain: process.env.AUTH_DOMAIN || '',
      clientId: process.env.AUTH_CLIENT_ID || '',
    },
    features: {
      enableNewUI: process.env.ENABLE_NEW_UI === 'true',
    },
  };
};
```

## Guidelines

1. Use the Singleton pattern for the Bootstrap class
2. Initialize all dependencies in the constructor
3. Provide accessor methods for ports
4. Create special methods for testing
5. Consider using factories for complex initialization
6. Load configuration from environment variables
7. Keep the bootstrap module focused on wiring dependencies
8. Order initialization to respect dependencies
9. Use method chaining for fluent initialization
10. Document the bootstrap module thoroughly

## Application Bootstrap Example

For React applications, integrate with the app entry point:

```typescript
// index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Bootstrap } from './core/bootstrap';
import App from './App';

// Initialize the application
Bootstrap.getInstance();

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```