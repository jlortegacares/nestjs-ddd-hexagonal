"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Password = void 0;
const bcrypt = require("bcrypt");
class Password {
    constructor(hashedPassword) {
        this.hashedPassword = hashedPassword;
    }
    static async createFromPlainPassword(plainPassword) {
        Password.ensureValidPassword(plainPassword);
        const hashedPassword = await bcrypt.hash(plainPassword, Password.SALT_ROUNDS);
        return new Password(hashedPassword);
    }
    static fromHashed(hashedPassword) {
        return new Password(hashedPassword);
    }
    static ensureValidPassword(password) {
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
    async compare(plainPassword) {
        return bcrypt.compare(plainPassword, this.hashedPassword);
    }
    get value() {
        return this.hashedPassword;
    }
}
exports.Password = Password;
Password.SALT_ROUNDS = 10;
//# sourceMappingURL=password.value-object.js.map