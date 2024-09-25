import { Module } from '@nestjs/common';
import * as process from 'node:process';

import { AnalyticsProvider } from '../analytics/analytics.provider';
import { AstrologicalReportsProvider } from '../astrological-reports/astrological-reports.provider';
import { OffersModule } from '../offers/offers.module';
import { UsersModule } from '../users/users.module';
import { PurchasesController } from './controllers';
import { PurchasesRepository } from './repositories';
import { PurchasesService } from './services';

@Module({
  imports: [
    UsersModule,
    OffersModule,
    AnalyticsProvider.register(process.env.ANALYTICS_BASE_URL),
    AstrologicalReportsProvider.register(
      process.env.ASTROLOGICAL_REPORTS_BASE_URL,
    ),
  ],
  controllers: [PurchasesController],
  providers: [PurchasesRepository, PurchasesService],
})
export class PurchasesModule {}
