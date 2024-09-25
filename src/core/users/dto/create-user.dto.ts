import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail({ blacklisted_chars: '+', domain_specific_validation: true })
  email: string;

  @IsString()
  marketingData: string;
}
