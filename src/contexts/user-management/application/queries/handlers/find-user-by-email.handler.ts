import { Inject, Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { FindUserByEmailQuery } from '../find-user-by-email.query';
import { USER_REPOSITORY, IUserRepository } from '../../../domain/repositories/user.repository.interface';
import { Email } from '../../../domain/value-objects/email.value-object';
import { UserResponse } from '../../dtos/user.response';

@Injectable()
@QueryHandler(FindUserByEmailQuery)
export class FindUserByEmailHandler implements IQueryHandler<FindUserByEmailQuery> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(query: FindUserByEmailQuery): Promise<UserResponse | null> {
    const email = new Email(query.email);
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return null;
    }

    return new UserResponse(
      user.getId(),
      user.getEmail().value,
      user.getFirstName(),
      user.getLastName(),
      user.isUserActive(),
    );
  }
} 