export declare class Email {
    private readonly email;
    constructor(email: string);
    private ensureValidEmail;
    get value(): string;
    equals(other: Email): boolean;
    toString(): string;
}
