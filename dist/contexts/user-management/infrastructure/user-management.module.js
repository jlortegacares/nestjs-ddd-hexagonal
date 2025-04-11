"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManagementModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const user_schema_1 = require("./persistence/orm/user.schema");
const user_controller_1 = require("./adapters/controllers/user.controller");
const user_repository_1 = require("./adapters/repositories/user.repository");
const create_user_use_case_1 = require("../application/use-cases/create-user.use-case");
const user_repository_interface_1 = require("../domain/repositories/user.repository.interface");
const CommandHandlers = [create_user_use_case_1.CreateUserHandler];
let UserManagementModule = class UserManagementModule {
};
exports.UserManagementModule = UserManagementModule;
exports.UserManagementModule = UserManagementModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cqrs_1.CqrsModule,
            typeorm_1.TypeOrmModule.forFeature([user_schema_1.UserSchema])
        ],
        controllers: [user_controller_1.UserController],
        providers: [
            {
                provide: user_repository_interface_1.USER_REPOSITORY,
                useClass: user_repository_1.UserRepository,
            },
            ...CommandHandlers
        ],
    })
], UserManagementModule);
//# sourceMappingURL=user-management.module.js.map