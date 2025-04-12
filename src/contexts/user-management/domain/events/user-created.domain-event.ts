export class UserCreatedDomainEvent {
  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly occurredOn: Date = new Date(),
  ) {}
}
