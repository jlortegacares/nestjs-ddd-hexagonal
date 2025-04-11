import { Body, Controller, Post, HttpStatus } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../../application/use-cases/create-user.use-case';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserRequest {
  @IsEmail({}, { message: 'El email debe ser válido' })
  @ApiProperty({
    description: 'Email del usuario',
    example: 'usuario@ejemplo.com'
  })
  email: string;

  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'password123',
    minLength: 8
  })
  password: string;

  @IsString()
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan'
  })
  firstName: string;

  @IsString()
  @ApiProperty({
    description: 'Apellido del usuario',
    example: 'Pérez'
  })
  lastName: string;
}

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Usuario creado exitosamente' 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Datos de entrada inválidos' 
  })
  @ApiResponse({ 
    status: HttpStatus.CONFLICT, 
    description: 'El email ya está registrado' 
  })
  async createUser(@Body() request: CreateUserRequest): Promise<void> {
    const command = new CreateUserCommand(
      request.email,
      request.password,
      request.firstName,
      request.lastName,
    );
    
    await this.commandBus.execute(command);
  }
} 