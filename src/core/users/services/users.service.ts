import { ConflictException, Injectable } from '@nestjs/common';
import {
  Pagination,
  PaginationTypeEnum,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Transactional } from 'typeorm-transactional';

import { EMAIL_WAS_EXIST } from '../../../common';
import { Users } from '../entities';
import { UsersRepository } from '../repositories';

@Injectable()
export class UsersService {
  constructor(private readonly _UsersRepository: UsersRepository) {}

  @Transactional()
  async create(email: string, marketingData: string): Promise<Users> {
    const existUserWithEmail = await this._UsersRepository.exists({
      where: {
        email,
      },
    });

    if (existUserWithEmail) {
      throw new ConflictException(EMAIL_WAS_EXIST);
    }

    return this._UsersRepository.save({
      email,
      marketingData,
    });
  }

  @Transactional()
  async getAll(page: number, limit: number): Promise<Pagination<Users>> {
    return paginate(this._UsersRepository, {
      limit,
      page,
      paginationType: PaginationTypeEnum.TAKE_AND_SKIP,
    });
  }

  async existsById(userId: string): Promise<boolean> {
    return this._UsersRepository.exists({
      where: {
        id: userId,
      },
    });
  }
}
