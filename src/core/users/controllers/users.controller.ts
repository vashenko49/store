import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';

import { GetAllDto } from '../../../common';
import { CreateUserDto } from '../dto';
import { Users } from '../entities';
import { UsersService } from '../services';

@Controller('users')
export class UsersController {
  constructor(private readonly _UsersService: UsersService) {}

  @Post()
  async create(
    @Body() { email, marketingData }: CreateUserDto,
  ): Promise<Users> {
    return this._UsersService.create(email, marketingData);
  }

  @Get()
  async getAll(
    @Query() { page, limit }: GetAllDto,
  ): Promise<Pagination<Users>> {
    return this._UsersService.getAll(page, limit);
  }
}
