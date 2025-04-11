import { CommandBus } from '@nestjs/cqrs';
export declare class CreateUserRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}
export declare class UserController {
    private readonly commandBus;
    constructor(commandBus: CommandBus);
    createUser(request: CreateUserRequest): Promise<void>;
}
