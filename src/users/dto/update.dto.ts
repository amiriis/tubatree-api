import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  mother_name: string;
}
