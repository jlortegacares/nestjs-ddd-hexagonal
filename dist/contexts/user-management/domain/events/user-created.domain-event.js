"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreatedDomainEvent = void 0;
class UserCreatedDomainEvent {
    constructor(userId, email, occurredOn = new Date()) {
        this.userId = userId;
        this.email = email;
        this.occurredOn = occurredOn;
    }
}
exports.UserCreatedDomainEvent = UserCreatedDomainEvent;
//# sourceMappingURL=user-created.domain-event.js.map