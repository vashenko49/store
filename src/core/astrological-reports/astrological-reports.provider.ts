import { BullModule } from '@nestjs/bull';
import { DynamicModule } from '@nestjs/common';

import { QueueName } from '../../common';
import { AstrologicalReportsGateway } from './gateways';
import { AstrologicalReportsProcessor } from './processors';
import { AstrologicalReportsQueue } from './queues';

export class AstrologicalReportsProvider {
  static register(baseUrl: string): DynamicModule {
    const analytics = new AstrologicalReportsGateway(baseUrl);

    return {
      module: AstrologicalReportsProvider,
      imports: [
        BullModule.registerQueue({
          name: QueueName.ASTROLOGICAL_REPORTS,
          defaultJobOptions: {
            removeOnComplete: true,
            removeOnFail: true,
          },
        }),
      ],
      providers: [
        {
          provide: AstrologicalReportsGateway,
          useValue: analytics,
        },
        AstrologicalReportsQueue,
        AstrologicalReportsProcessor,
      ],
      exports: [AstrologicalReportsQueue],
    };
  }
}
