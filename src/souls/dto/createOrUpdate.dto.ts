import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrUpdateDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  fatherName: string;

  @IsNotEmpty()
  @IsString()
  motherName: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['male', 'female'])
  gender: string;
}
