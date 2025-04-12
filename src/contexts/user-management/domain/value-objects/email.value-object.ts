export class Email {
  constructor(private readonly email: string) {
    this.ensureValidEmail();
  }

  private ensureValidEmail(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(this.email)) {
      throw new Error('Invalid email format');
    }

    if (this.email.length > 255) {
      throw new Error('Email is too long');
    }

    const [localPart, domain] = this.email.split('@');

    if (localPart.length > 64) {
      throw new Error('Local part of email is too long');
    }

    if (domain.length > 255) {
      throw new Error('Domain part of email is too long');
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
