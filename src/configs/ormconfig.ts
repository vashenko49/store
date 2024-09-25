import * as dotenv from 'dotenv';
import * as process from 'process';
import { DataSource, DataSourceOptions } from 'typeorm';

import { Offers } from '../core/offers/entities';
import { Purchases } from '../core/purchases/entities';
import { Users } from '../core/users/entities';
import migrations from '../migrations';

dotenv.config();

export const entities = [Users, Offers, Purchases];

export const dbConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRESQL_HOST,
  port: Number(process.env.POSTGRESQL_PORT),
  username: process.env.POSTGRESQL_USERNAME,
  password: process.env.POSTGRESQL_PASSWORD,
  database: process.env.POSTGRESQL_NAME,
  entities,
  migrations,

  migrationsRun: false,
  synchronize: false,
  logging: false,
};

const dataSource = new DataSource(dbConfig);
export default dataSource;
