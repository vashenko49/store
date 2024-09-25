import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import {
  NOT_FOUND_OFFER,
  NOT_FOUND_USER,
  PURCHASE_WAS_EXIST,
} from '../../../common';
import { AnalyticsGateway } from '../../analytics/gateways';
import { AstrologicalReportsQueue } from '../../astrological-reports/queues';
import { OffersService } from '../../offers/services';
import { UsersService } from '../../users/services';
import { Purchases } from '../entities';
import { PurchasesRepository } from '../repositories';

@Injectable()
export class PurchasesService {
  constructor(
    private readonly _PurchasesRepository: PurchasesRepository,
    private readonly _UsersService: UsersService,
    private readonly _OffersService: OffersService,
    private readonly _AnalyticsGateway: AnalyticsGateway,
    private readonly _AstrologicalReportsQueue: AstrologicalReportsQueue,
  ) {}

  @Transactional()
  async create(userId: string, offerId: string): Promise<Purchases> {
    const isUser = await this._UsersService.existsById(userId);

    if (!isUser) {
      throw new NotFoundException(NOT_FOUND_USER);
    }

    const isOffer = await this._OffersService.existsById(offerId);

    if (!isOffer) {
      throw new NotFoundException(NOT_FOUND_OFFER);
    }

    const isExistPurchase = await this._PurchasesRepository.exists({
      where: {
        offerId,
        userId,
      },
    });

    if (isExistPurchase) {
      throw new ConflictException(PURCHASE_WAS_EXIST);
    }

    const purchase = await this._PurchasesRepository.save({
      offerId,
      userId,
    });

    await this._AnalyticsGateway.send();

    await this._AstrologicalReportsQueue.send(userId);

    return purchase;
  }
}
