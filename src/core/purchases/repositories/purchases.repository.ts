import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Purchases } from '../entities';

@Injectable()
export class PurchasesRepository extends Repository<Purchases> {
  constructor(private dataSource: DataSource) {
    super(Purchases, dataSource.createEntityManager());
  }
}
