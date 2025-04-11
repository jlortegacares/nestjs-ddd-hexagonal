import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './persistence/orm/user.schema';
import { UserController } from './adapters/controllers/user.controller';
import { UserRepository } from './adapters/repositories/user.repository';
import { CreateUserHandler } from '../application/use-cases/create-user.use-case';
import { USER_REPOSITORY } from '../domain/repositories/user.repository.interface';

const CommandHandlers = [CreateUserHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserSchema])
  ],
  controllers: [UserController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    ...CommandHandlers
  ],
})
export class UserManagementModule {} 