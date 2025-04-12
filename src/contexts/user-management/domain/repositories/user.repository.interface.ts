import { User } from '../models/user.entity';
import { Email } from '../value-objects/email.value-object';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface IUserRepository {
  save(user: User): Promise<void>;
  exists(email: Email): Promise<boolean>;
  findByEmail(email: Email): Promise<User | null>;
}
