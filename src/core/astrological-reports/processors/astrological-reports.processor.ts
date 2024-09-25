import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { QueueName } from '../../../common';
import { AstrologicalReportProcess } from '../enums';
import { AstrologicalReportsGateway } from '../gateways';

@Processor(QueueName.ASTROLOGICAL_REPORTS)
export class AstrologicalReportsProcessor {
  constructor(
    private readonly _AstrologicalReportsGateway: AstrologicalReportsGateway,
  ) {}

  @Process(AstrologicalReportProcess.SEND)
  async send(job: Job<string>) {
    await this._AstrologicalReportsGateway.send(job.data);
  }
}
