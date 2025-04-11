import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../domain/models/user.entity';
import { Email } from '../../../domain/value-objects/email.value-object';
import { Password } from '../../../domain/value-objects/password.value-object';
import { UserRepository as IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { UserSchema } from '../../persistence/orm/user.schema';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserSchema)
    private readonly repository: Repository<UserSchema>,
  ) {}

  async save(user: User): Promise<void> {
    const userSchema = this.toSchema(user);
    await this.repository.save(userSchema);
  }

  async findById(id: string): Promise<User | null> {
    const userSchema = await this.repository.findOne({ where: { id } });
    if (!userSchema) return null;
    return this.toDomain(userSchema);
  }

  async findByEmail(email: Email): Promise<User | null> {
    const userSchema = await this.repository.findOne({ 
      where: { email: email.value } 
    });
    if (!userSchema) return null;
    return this.toDomain(userSchema);
  }

  async exists(email: Email): Promise<boolean> {
    const count = await this.repository.count({ 
      where: { email: email.value } 
    });
    return count > 0;
  }

  private toSchema(user: User): UserSchema {
    const schema = new UserSchema();
    schema.id = user.getId();
    schema.email = user.getEmail().value;
    schema.password = user.getPassword().value;
    schema.firstName = user.getFirstName();
    schema.lastName = user.getLastName();
    schema.isActive = user.isUserActive();
    schema.createdAt = new Date();
    schema.updatedAt = new Date();
    return schema;
  }

  private toDomain(schema: UserSchema): User {
    return new User(
      schema.id,
      new Email(schema.email),
      Password.fromHashed(schema.password),
      schema.firstName,
      schema.lastName,
      schema.isActive,
      schema.createdAt,
      schema.updatedAt,
    );
  }
} 