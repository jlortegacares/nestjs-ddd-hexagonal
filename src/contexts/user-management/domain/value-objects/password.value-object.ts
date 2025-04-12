import * as bcrypt from 'bcrypt';

export class Password {
  private static readonly SALT_ROUNDS = 10;

  private readonly hashedPassword: string;

  private constructor(hashedPassword: string) {
    this.hashedPassword = hashedPassword;
  }

  public static async createFromPlainPassword(plainPassword: string): Promise<Password> {
    Password.ensureValidPassword(plainPassword);
    const hashedPassword = await bcrypt.hash(plainPassword, Password.SALT_ROUNDS);

    return new Password(hashedPassword);
  }

  public static fromHashed(hashedPassword: string): Password {
    return new Password(hashedPassword);
  }

  private static ensureValidPassword(password: string): void {
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(password)) {
      throw new Error('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      throw new Error('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
      throw new Error('Password must contain at least one number');
    }
  }

  public async compare(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.hashedPassword);
  }

  get value(): string {
    return this.hashedPassword;
  }
}
