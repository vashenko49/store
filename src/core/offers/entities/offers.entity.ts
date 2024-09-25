import { Transform } from 'class-transformer';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Purchases } from '../../purchases/entities';

@Entity({
  name: 'offers',
})
export class Offers {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  name: string;

  // price in minor currency units in  100 cents -> 1.00 EUR
  @Column({
    type: 'integer',
  })
  @Transform(({ value }) => Number(value), { toPlainOnly: true })
  price: number;

  @OneToOne(() => Purchases, (purchase) => purchase.offer)
  purchases?: Purchases;
}
