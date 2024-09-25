import { Module } from '@nestjs/common';

import { OffersController } from './controllers';
import { OffersRepository } from './repositories';
import { OffersService } from './services';

@Module({
  controllers: [OffersController],
  providers: [OffersRepository, OffersService],
  exports: [OffersService],
})
export class OffersModule {}
