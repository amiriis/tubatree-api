import { IsNotEmpty, IsString, Length } from 'class-validator';

export class OtpDto {
  @Length(9)
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;
}
