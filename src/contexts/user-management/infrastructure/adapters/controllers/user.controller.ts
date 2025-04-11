import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../../application/use-cases/create-user.use-case';

export class CreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

@Controller('users')
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createUser(@Body() request: CreateUserRequest): Promise<void> {
    const command = new CreateUserCommand(
      request.email,
      request.password,
      request.firstName,
      request.lastName,
    );
    
    await this.commandBus.execute(command);
  }
} 