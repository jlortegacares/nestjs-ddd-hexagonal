import { AggregateRoot } from '@nestjs/cqrs';
import { Email } from '../value-objects/email.value-object';
import { Password } from '../value-objects/password.value-object';
import { UserCreatedDomainEvent } from '../events/user-created.domain-event';

export class User extends AggregateRoot {
  constructor(
    private readonly id: string,
    private email: Email,
    private password: Password,
    private firstName: string,
    private lastName: string,
    private isActive: boolean = true,
    private createdAt: Date = new Date(),
    private updatedAt: Date = new Date(),
  ) {
    super();
  }

  // Factory method for creating a new user
  public static create(
    id: string,
    email: Email,
    password: Password,
    firstName: string,
    lastName: string,
  ): User {
    const user = new User(id, email, password, firstName, lastName);
    user.apply(new UserCreatedDomainEvent(id, email.value));
    return user;
  }

  // Getters
  public getId(): string {
    return this.id;
  }

  public getEmail(): Email {
    return this.email;
  }

  public getPassword(): Password {
    return this.password;
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public isUserActive(): boolean {
    return this.isActive;
  }

  // Business methods
  public deactivate(): void {
    this.isActive = false;
    this.updatedAt = new Date();
  }

  public activate(): void {
    this.isActive = true;
    this.updatedAt = new Date();
  }

  public updatePersonalInfo(firstName: string, lastName: string): void {
    this.firstName = firstName;
    this.lastName = lastName;
    this.updatedAt = new Date();
  }
} 