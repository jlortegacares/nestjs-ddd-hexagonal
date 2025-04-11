import { ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../domain/repositories/user.repository.interface';
export declare class CreateUserCommand {
    readonly email: string;
    readonly password: string;
    readonly firstName: string;
    readonly lastName: string;
    constructor(email: string, password: string, firstName: string, lastName: string);
}
export declare class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(command: CreateUserCommand): Promise<void>;
}
