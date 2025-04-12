import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';

import { User } from '../../domain/models/user.entity';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../../domain/repositories/user.repository.interface';
import { Email } from '../../domain/value-objects/email.value-object';
import { Password } from '../../domain/value-objects/password.value-object';
import { CreateUserCommand } from '../commands/create-user.command';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const email = new Email(command.email);

    const exists = await this.userRepository.exists(email);

    if (exists) {
      throw new Error('User with this email already exists');
    }

    const password = await Password.createFromPlainPassword(command.password);

    const user = User.create(uuid(), email, password, command.firstName, command.lastName);

    await this.userRepository.save(user);
  }
}
