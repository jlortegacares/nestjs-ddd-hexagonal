import { Body, Controller, Get, HttpStatus, NotFoundException, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserCommand } from '../../../application/commands/create-user.command';
import { FindUserByEmailQuery } from '../../../application/queries/find-user-by-email.query';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserResponse } from '../../../application/dtos/user.response';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email already registered',
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

  @Get('by-email')
  @ApiOperation({ summary: 'Find user by email' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User found',
    type: UserResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid email format',
  })
  async findByEmail(@Query('email') email: string): Promise<UserResponse> {
    const query = new FindUserByEmailQuery(email);
    const user = await this.queryBus.execute(query);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
