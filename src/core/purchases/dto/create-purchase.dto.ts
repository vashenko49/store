import { IsUUID } from 'class-validator';

export class CreatePurchaseDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  offerId: string;
}
