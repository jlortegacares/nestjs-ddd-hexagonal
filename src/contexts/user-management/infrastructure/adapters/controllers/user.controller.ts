import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserCommand } from '../../../application/use-cases/create-user.use-case';
import { CreateUserDto } from './dtos/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Usuario creado exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'El email ya está registrado',
  })
  async createUser(@Body() request: CreateUserDto): Promise<void> {
    const command = new CreateUserCommand(
      request.email,
      request.password,
      request.firstName,
      request.lastName,
    );

    await this.commandBus.execute(command);
  }
}
