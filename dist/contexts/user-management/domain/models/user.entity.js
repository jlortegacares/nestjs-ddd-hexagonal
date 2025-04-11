"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const user_created_domain_event_1 = require("../events/user-created.domain-event");
class User extends cqrs_1.AggregateRoot {
    constructor(id, email, password, firstName, lastName, isActive = true, createdAt = new Date(), updatedAt = new Date()) {
        super();
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static create(id, email, password, firstName, lastName) {
        const user = new User(id, email, password, firstName, lastName);
        user.apply(new user_created_domain_event_1.UserCreatedDomainEvent(id, email.value));
        return user;
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
    getFirstName() {
        return this.firstName;
    }
    getLastName() {
        return this.lastName;
    }
    isUserActive() {
        return this.isActive;
    }
    deactivate() {
        this.isActive = false;
        this.updatedAt = new Date();
    }
    activate() {
        this.isActive = true;
        this.updatedAt = new Date();
    }
    updatePersonalInfo(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.updatedAt = new Date();
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map