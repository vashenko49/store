import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import {
  addTransactionalDataSource,
  getDataSourceByName,
} from 'typeorm-transactional';

import { dbConfig, validationSchema } from './configs';
import { OffersModule } from './core/offers/offers.module';
import { PurchasesModule } from './core/purchases/purchases.module';
import { UsersModule } from './core/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema,
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      useFactory() {
        return dbConfig;
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        const dataSource =
          getDataSourceByName('default') ||
          addTransactionalDataSource(new DataSource(options));
        return dataSource;
      },
    }),

    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        prefix: configService.get('REDIS_PREFIX'),
        redis: {
          host: configService.get('REDIS_HOST'),
          port: +configService.get('REDIS_PORT'),
          password: configService.get('REDIS_PASSWORD'),
        },
      }),
    }),

    UsersModule,
    OffersModule,
    PurchasesModule,
  ],
})
export class AppModule {}
