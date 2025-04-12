import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';

import { User } from '../../domain/models/user.entity';
import { USER_REPOSITORY, IUserRepository } from '../../domain/repositories/user.repository.interface';
import { Email } from '../../domain/value-objects/email.value-object';
import { Password } from '../../domain/value-objects/password.value-object';

export class CreateUserCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly firstName: string,
    public readonly lastName: string,
  ) {}
}

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

    const user = User.create(
      uuid(),
      email,
      password,
      command.firstName,
      command.lastName,
    );

    await this.userRepository.save(user);
  }
}
