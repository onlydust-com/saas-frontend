# Models Rules

Models are the core business entities in our domain-driven design.

## Model Structure

A domain model should:

1. Encapsulate business logic
2. Have private properties and public accessors
3. Use factory methods for creation
4. Be immutable where possible
5. Convert between domain and DTO representations

## Model Template

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
    this.validate();
  }

  // Factory method
  public static create(data: FeatureData): FeatureModel {
    return new FeatureModel({
      id: data.id,
      name: data.name,
      // other properties...
    });
  }

  // Business logic methods
  public updateName(name: string): void {
    this.name = name;
    this.validate();
  }

  // Validation
  private validate(): void {
    if (!this.name || this.name.trim() === '') {
      throw new Error('Feature name cannot be empty');
    }
    // other validations...
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

## Guidelines

1. Use TypeScript classes for models
2. Make constructors private and use factory methods
3. Implement validation logic in the model
4. Use getter methods instead of exposing properties directly
5. Implement a `toDTO()` method to convert to data transfer object
6. Keep business logic in the model, not in services
7. Consider using Value Objects for complex properties
8. Use composition over inheritance
9. Keep models focused on a single responsibility
10. Use static methods for operations that don't require an instance

## Complex Model Example

For more complex models with relationships:

```typescript
// models/user-model.ts
import { UserData, RoleType } from '../user-contract.types';
import { RoleModel } from './role-model';

export class UserModel {
  private readonly id: string;
  private email: string;
  private roles: RoleModel[];

  private constructor(props: { id: string; email: string; roles: RoleModel[] }) {
    this.id = props.id;
    this.email = props.email;
    this.roles = props.roles;
    this.validate();
  }

  public static create(data: UserData): UserModel {
    const roles = data.roles.map(role => RoleModel.create(role));
    
    return new UserModel({
      id: data.id,
      email: data.email,
      roles,
    });
  }

  public hasRole(roleType: RoleType): boolean {
    return this.roles.some(role => role.getType() === roleType);
  }

  public addRole(role: RoleModel): void {
    if (!this.hasRole(role.getType())) {
      this.roles.push(role);
    }
  }

  public removeRole(roleType: RoleType): void {
    this.roles = this.roles.filter(role => role.getType() !== roleType);
  }

  private validate(): void {
    if (!this.email || !this.email.includes('@')) {
      throw new Error('Invalid email format');
    }
  }

  public getId(): string {
    return this.id;
  }

  public getEmail(): string {
    return this.email;
  }

  public getRoles(): RoleModel[] {
    return [...this.roles]; // Return a copy to prevent modification
  }

  public toDTO(): UserData {
    return {
      id: this.id,
      email: this.email,
      roles: this.roles.map(role => role.toDTO()),
    };
  }
}
```