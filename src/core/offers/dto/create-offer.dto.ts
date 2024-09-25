import { IsInt, IsNumber, IsString, Min } from 'class-validator';

export class CreateOfferDto {
  @IsString()
  name: string;

  // price in minor currency units in  100 cents -> 1.00 EUR
  @IsNumber()
  @IsInt()
  @Min(1)
  price: number;
}
