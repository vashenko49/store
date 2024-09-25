import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { Offers } from '../../offers/entities';
import { Users } from '../../users/entities';

@Entity({
  name: 'purchases',
})
@Unique(['userId', 'offerId'])
export class Purchases {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'user_id',
  })
  userId: string;

  @ManyToOne(() => Users, (user) => user.purchases)
  @JoinColumn({ name: 'user_id' })
  user?: Users;

  @Column({
    name: 'offer_id',
  })
  offerId: string;

  @ManyToOne(() => Offers, (offer) => offer.purchases)
  @JoinColumn({ name: 'offer_id' })
  offer?: Offers;
}
