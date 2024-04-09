import { IsNotEmpty, IsString, Length } from 'class-validator';

export class VerifyDto {
  @Length(9)
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @Length(6)
  @IsNotEmpty()
  verifyCode: string;
}
