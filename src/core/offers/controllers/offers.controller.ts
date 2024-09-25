import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';

import { GetAllDto } from '../../../common';
import { CreateOfferDto } from '../dto/create-offer.dto';
import { Offers } from '../entities';
import { OffersService } from '../services';

@Controller('offers')
export class OffersController {
  constructor(private readonly _OffersService: OffersService) {}

  @Post()
  async create(@Body() { price, name }: CreateOfferDto): Promise<Offers> {
    return this._OffersService.create(name, price);
  }

  @Get()
  async getAll(
    @Query() { page, limit }: GetAllDto,
  ): Promise<Pagination<Offers>> {
    return this._OffersService.getAll(page, limit);
  }
}
