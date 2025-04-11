import { User } from '../models/user.entity';
import { Email } from '../value-objects/email.value-object';
export declare const USER_REPOSITORY = "USER_REPOSITORY";
export interface UserRepository {
    save(user: User): Promise<void>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: Email): Promise<User | null>;
    exists(email: Email): Promise<boolean>;
}
