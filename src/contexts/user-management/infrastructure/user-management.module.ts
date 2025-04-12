import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateUserHandler } from '../application/use-cases/create-user.use-case';
import { USER_REPOSITORY } from '../domain/repositories/user.repository.interface';
import { UserController } from './adapters/controllers/user.controller';
import { UserTypeOrmRepository } from './adapters/repositories/user.repository';
import { UserSchema } from './persistence/orm/user.schema';

const CommandHandlers = [CreateUserHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserSchema])],
  controllers: [UserController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserTypeOrmRepository,
    },
    ...CommandHandlers,
  ],
})
export class UserManagementModule {}
