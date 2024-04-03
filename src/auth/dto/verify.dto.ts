import { IsNotEmpty, IsString, Length } from 'class-validator';

export class VerifyDto {
  @Length(9)
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @Length(6)
  @IsNotEmpty()
  verify_code: string;
}
