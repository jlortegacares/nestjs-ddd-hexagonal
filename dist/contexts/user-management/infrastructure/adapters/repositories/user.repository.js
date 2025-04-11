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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../../domain/models/user.entity");
const email_value_object_1 = require("../../../domain/value-objects/email.value-object");
const password_value_object_1 = require("../../../domain/value-objects/password.value-object");
const user_schema_1 = require("../../persistence/orm/user.schema");
let UserRepository = class UserRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async save(user) {
        const userSchema = this.toSchema(user);
        await this.repository.save(userSchema);
    }
    async findById(id) {
        const userSchema = await this.repository.findOne({ where: { id } });
        if (!userSchema)
            return null;
        return this.toDomain(userSchema);
    }
    async findByEmail(email) {
        const userSchema = await this.repository.findOne({
            where: { email: email.value }
        });
        if (!userSchema)
            return null;
        return this.toDomain(userSchema);
    }
    async exists(email) {
        const count = await this.repository.count({
            where: { email: email.value }
        });
        return count > 0;
    }
    toSchema(user) {
        const schema = new user_schema_1.UserSchema();
        schema.id = user.getId();
        schema.email = user.getEmail().value;
        schema.password = user.getPassword().value;
        schema.firstName = user.getFirstName();
        schema.lastName = user.getLastName();
        schema.isActive = user.isUserActive();
        schema.createdAt = new Date();
        schema.updatedAt = new Date();
        return schema;
    }
    toDomain(schema) {
        return new user_entity_1.User(schema.id, new email_value_object_1.Email(schema.email), password_value_object_1.Password.fromHashed(schema.password), schema.firstName, schema.lastName, schema.isActive, schema.createdAt, schema.updatedAt);
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_schema_1.UserSchema)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserRepository);
//# sourceMappingURL=user.repository.js.map