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
exports.UserController = exports.CreateUserRequest = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const create_user_use_case_1 = require("../../../application/use-cases/create-user.use-case");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateUserRequest {
}
exports.CreateUserRequest = CreateUserRequest;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'El email debe ser válido' }),
    (0, swagger_1.ApiProperty)({
        description: 'Email del usuario',
        example: 'usuario@ejemplo.com'
    }),
    __metadata("design:type", String)
], CreateUserRequest.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
    (0, swagger_1.ApiProperty)({
        description: 'Contraseña del usuario',
        example: 'password123',
        minLength: 8
    }),
    __metadata("design:type", String)
], CreateUserRequest.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'Nombre del usuario',
        example: 'Juan'
    }),
    __metadata("design:type", String)
], CreateUserRequest.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'Apellido del usuario',
        example: 'Pérez'
    }),
    __metadata("design:type", String)
], CreateUserRequest.prototype, "lastName", void 0);
let UserController = class UserController {
    constructor(commandBus) {
        this.commandBus = commandBus;
    }
    async createUser(request) {
        const command = new create_user_use_case_1.CreateUserCommand(request.email, request.password, request.firstName, request.lastName);
        await this.commandBus.execute(command);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo usuario' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Usuario creado exitosamente'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Datos de entrada inválidos'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CONFLICT,
        description: 'El email ya está registrado'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUserRequest]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [cqrs_1.CommandBus])
], UserController);
//# sourceMappingURL=user.controller.js.map