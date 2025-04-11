import { Repository } from 'typeorm';
import { User } from '../../../domain/models/user.entity';
import { Email } from '../../../domain/value-objects/email.value-object';
import { UserRepository as IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { UserSchema } from '../../persistence/orm/user.schema';
export declare class UserRepository implements IUserRepository {
    private readonly repository;
    constructor(repository: Repository<UserSchema>);
    save(user: User): Promise<void>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: Email): Promise<User | null>;
    exists(email: Email): Promise<boolean>;
    private toSchema;
    private toDomain;
}
