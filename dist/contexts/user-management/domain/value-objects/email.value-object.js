"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
class Email {
    constructor(email) {
        this.email = email;
        this.ensureValidEmail(email);
    }
    ensureValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }
    }
    get value() {
        return this.email;
    }
    equals(other) {
        return this.email === other.value;
    }
    toString() {
        return this.email;
    }
}
exports.Email = Email;
//# sourceMappingURL=email.value-object.js.map