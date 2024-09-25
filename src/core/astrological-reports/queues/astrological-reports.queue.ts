import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

import { QueueName } from '../../../common';
import { AstrologicalReportProcess } from '../enums';

@Injectable()
export class AstrologicalReportsQueue {
  constructor(
    @InjectQueue(QueueName.ASTROLOGICAL_REPORTS)
    private readonly astrologicalReportsQueue: Queue,
  ) {}

  async send(userId: string) {
    await this.astrologicalReportsQueue.add(
      AstrologicalReportProcess.SEND,
      userId,
      {
        delay: 24 * 60 * 60 * 1000, //24 house
      },
    );
  }
}
