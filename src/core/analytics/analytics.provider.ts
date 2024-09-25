import { DynamicModule, Module } from '@nestjs/common';

import { AnalyticsGateway } from './gateways';

export class AnalyticsProvider {
  static register(baseUrl: string): DynamicModule {
    const analytics = new AnalyticsGateway(baseUrl);

    return {
      module: AnalyticsProvider,
      providers: [
        {
          provide: AnalyticsGateway,
          useValue: analytics,
        },
      ],
      exports: [AnalyticsGateway],
    };
  }
}
