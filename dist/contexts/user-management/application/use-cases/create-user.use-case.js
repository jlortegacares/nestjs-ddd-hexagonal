"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserHandler = exports.CreateUserCommand = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const uuid_1 = require("uuid");
const user_entity_1 = require("../../domain/models/user.entity");
const email_value_object_1 = require("../../domain/value-objects/email.value-object");
const password_value_object_1 = require("../../domain/value-objects/password.value-object");
const user_repository_interface_1 = require("../../domain/repositories/user.repository.interface");
class CreateUserCommand {
    constructor(email, password, firstName, lastName) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
exports.CreateUserCommand = CreateUserCommand;
let CreateUserHandler = class CreateUserHandler {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(command) {
        const email = new email_value_object_1.Email(command.email);
        const exists = await this.userRepository.exists(email);
        if (exists) {
            throw new Error('User with this email already exists');
        }
        const password = await password_value_object_1.Password.createFromPlainPassword(command.password);
        const user = user_entity_1.User.create((0, uuid_1.v4)(), email, password, command.firstName, command.lastName);
        await this.userRepository.save(user);
    }
};
exports.CreateUserHandler = CreateUserHandler;
exports.CreateUserHandler = CreateUserHandler = __decorate([
    (0, common_1.Injectable)(),
    (0, cqrs_1.CommandHandler)(CreateUserCommand),
    __param(0, (0, common_1.Inject)(user_repository_interface_1.USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CreateUserHandler);
//# sourceMappingURL=create-user.use-case.js.map