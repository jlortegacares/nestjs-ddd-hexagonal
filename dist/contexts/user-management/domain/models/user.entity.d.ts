import { AggregateRoot } from '@nestjs/cqrs';
import { Email } from '../value-objects/email.value-object';
import { Password } from '../value-objects/password.value-object';
export declare class User extends AggregateRoot {
    private readonly id;
    private email;
    private password;
    private firstName;
    private lastName;
    private isActive;
    private createdAt;
    private updatedAt;
    constructor(id: string, email: Email, password: Password, firstName: string, lastName: string, isActive?: boolean, createdAt?: Date, updatedAt?: Date);
    static create(id: string, email: Email, password: Password, firstName: string, lastName: string): User;
    getId(): string;
    getEmail(): Email;
    getPassword(): Password;
    getFirstName(): string;
    getLastName(): string;
    isUserActive(): boolean;
    deactivate(): void;
    activate(): void;
    updatePersonalInfo(firstName: string, lastName: string): void;
}
