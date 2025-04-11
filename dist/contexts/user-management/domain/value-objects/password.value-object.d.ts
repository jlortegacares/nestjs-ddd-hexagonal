export declare class Password {
    private static readonly SALT_ROUNDS;
    private readonly hashedPassword;
    private constructor();
    static createFromPlainPassword(plainPassword: string): Promise<Password>;
    static fromHashed(hashedPassword: string): Password;
    private static ensureValidPassword;
    compare(plainPassword: string): Promise<boolean>;
    get value(): string;
}
