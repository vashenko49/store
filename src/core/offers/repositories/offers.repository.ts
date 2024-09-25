import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Offers } from '../entities';

@Injectable()
export class OffersRepository extends Repository<Offers> {
  constructor(private dataSource: DataSource) {
    super(Offers, dataSource.createEntityManager());
  }
}
