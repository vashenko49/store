import { Body, Controller, Post } from '@nestjs/common';

import { CreatePurchaseDto } from '../dto';
import { Purchases } from '../entities';
import { PurchasesService } from '../services';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly _PurchasesService: PurchasesService) {}

  @Post()
  async create(
    @Body() { userId, offerId }: CreatePurchaseDto,
  ): Promise<Purchases> {
    return this._PurchasesService.create(userId, offerId);
  }
}
