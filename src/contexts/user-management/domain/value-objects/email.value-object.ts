export class Email {
  constructor(private readonly email: string) {
    this.ensureValidEmail(email);
  }

  private ensureValidEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
  }

  get value(): string {
    return this.email;
  }

  equals(other: Email): boolean {
    return this.email === other.value;
  }

  toString(): string {
    return this.email;
  }
} 