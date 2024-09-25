import { ConflictException, Injectable } from '@nestjs/common';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { Transactional } from 'typeorm-transactional';

import { OFFER_WAS_EXIST } from '../../../common';
import { Offers } from '../entities';
import { OffersRepository } from '../repositories';

@Injectable()
export class OffersService {
  constructor(private readonly _OffersRepository: OffersRepository) {}

  @Transactional()
  async create(name: string, price: number): Promise<Offers> {
    const existOffer = await this._OffersRepository.exists({
      where: {
        name,
      },
    });

    if (existOffer) {
      throw new ConflictException(OFFER_WAS_EXIST);
    }

    return this._OffersRepository.save({
      name,
      price,
    });
  }

  @Transactional()
  async getAll(page: number, limit: number): Promise<Pagination<Offers>> {
    return paginate(this._OffersRepository, {
      limit,
      page,
    });
  }

  async existsById(offerId: string): Promise<boolean> {
    return this._OffersRepository.exists({
      where: {
        id: offerId,
      },
    });
  }
}
