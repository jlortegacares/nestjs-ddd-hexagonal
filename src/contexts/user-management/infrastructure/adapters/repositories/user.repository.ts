import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../../../domain/models/user.entity';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { Email } from '../../../domain/value-objects/email.value-object';
import { Password } from '../../../domain/value-objects/password.value-object';
import { UserSchema } from '../../persistence/orm/user.schema';

@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserSchema)
    private readonly userRepository: Repository<UserSchema>,
  ) {}

  async save(user: User): Promise<void> {
    const schema = UserTypeOrmRepository.toSchema(user);

    await this.userRepository.save(schema);
  }

  async findById(id: string): Promise<User | null> {
    const userSchema = await this.userRepository.findOne({ where: { id } });

    return userSchema ? UserTypeOrmRepository.toDomain(userSchema) : null;
  }

  async findByEmail(email: Email): Promise<User | null> {
    const schema = await this.userRepository.findOne({
      where: { email: email.value },
    });

    return schema ? UserTypeOrmRepository.toDomain(schema) : null;
  }

  async exists(email: Email): Promise<boolean> {
    const count = await this.userRepository.count({
      where: { email: email.value },
    });

    return count > 0;
  }

  private static toSchema(user: User): UserSchema {
    const schema = new UserSchema();

    Object.assign(schema, {
      id: user.getId(),
      email: user.getEmail().value,
      password: user.getPassword().value,
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      isActive: user.isUserActive(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return schema;
  }

  private static toDomain(schema: UserSchema): User {
    return User.create(
      schema.id,
      new Email(schema.email),
      Password.fromHashed(schema.password),
      schema.firstName,
      schema.lastName,
    );
  }
}
