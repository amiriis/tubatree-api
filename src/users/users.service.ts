import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { UpdateDto } from './dto/update.dto';
import { TubaService } from 'src/tuba/tuba.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly user_repository: Repository<Users>,
    private readonly tubaService: TubaService,
  ) {}

  async findAll() {
    return await this.user_repository.find();
  }

  async findByPhoneNumber(phone_number: string) {
    return await this.user_repository.findOne({ where: { phone_number } });
  }

  async findById(id: number) {
    return await this.user_repository.findOne({ where: { id } });
  }

  async update(id: number, updateDto: UpdateDto) {
    const nameAbjad = this.tubaService.generateAbjadByName(
      updateDto.first_name,
    );
    const motherAbjad = this.tubaService.generateAbjadByName(
      updateDto.mother_name,
    );
    await this.user_repository.update(
      { id },
      {
        first_name: updateDto.first_name,
        first_name_abjad: nameAbjad,
        mother_name: updateDto.mother_name,
        mother_name_abjad: motherAbjad,
      },
    );

    return { message: 'Your operation was successful!' };
  }
}
