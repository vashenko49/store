import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Purchases } from '../../purchases/entities';

@Entity({
  name: 'users',
})
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    name: 'marketing_data',
  })
  marketingData: string;

  @OneToOne(() => Purchases, (purchase) => purchase.user)
  purchases?: Purchases;
}
