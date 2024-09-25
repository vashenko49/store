import { Transform, Type } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

export class GetAllDto {
  @Type(() => Number)
  @Min(1)
  @Max(9999)
  @IsInt()
  @Transform(({ value }) => value ?? 1)
  page: number = 1;

  @Type(() => Number)
  @Min(1)
  @Max(100)
  @IsInt()
  @Transform(({ value }) => value ?? 20)
  limit: number = 20;
}
