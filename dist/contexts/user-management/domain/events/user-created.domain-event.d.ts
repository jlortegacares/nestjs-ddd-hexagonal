export declare class UserCreatedDomainEvent {
    readonly userId: string;
    readonly email: string;
    readonly occurredOn: Date;
    constructor(userId: string, email: string, occurredOn?: Date);
}
