import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrUpdateDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  father_name: string;

  @IsNotEmpty()
  @IsString()
  mother_name: string;
}
