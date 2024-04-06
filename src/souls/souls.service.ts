import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AllahService } from 'src/allah/allah.service';
import { TubaService } from 'src/tuba/tuba.service';
import { Repository } from 'typeorm';
import { CreateOrUpdateDto } from './dto/createOrUpdate.dto';
import { Souls } from './entities/soul.entity';

@Injectable()
export class SoulsService {
  constructor(
    @InjectRepository(Souls)
    private readonly soul_repository: Repository<Souls>,
    private readonly tubaService: TubaService,
    private readonly allahService: AllahService,
  ) {}

  async findByUserId(userId: number) {
    const soul = await this.soul_repository.findOne({
      where: { userId },
      relations: { allahName: true },
    });

    if (!soul) throw new HttpException('Soal not found!', HttpStatus.NOT_FOUND);

    return soul;
  }

  async createOrUpdate(id: number, createOrUpdateDto: CreateOrUpdateDto) {
    const nameAbjad = this.tubaService.generateAbjadByName(
      createOrUpdateDto.first_name,
    );
    const fatherAbjad = this.tubaService.generateAbjadByName(
      createOrUpdateDto.father_name,
    );
    const motherAbjad = this.tubaService.generateAbjadByName(
      createOrUpdateDto.mother_name,
    );

    const allahName = await this.allahService.getAllahNameByAbjad(
      nameAbjad + motherAbjad,
    );
    const soul = await this.soul_repository.findOne({ where: { userId: id } });

    if (soul) {
      await this.soul_repository.update(
        { id: soul.id },
        {
          allahNameId: allahName.id,
          first_name: createOrUpdateDto.first_name,
          first_name_abjad: nameAbjad,
          father_name: createOrUpdateDto.father_name,
          father_name_abjad: fatherAbjad,
          mother_name: createOrUpdateDto.mother_name,
          mother_name_abjad: motherAbjad,
        },
      );
    } else {
      const newSoul = this.soul_repository.create({
        userId: id,
        allahNameId: allahName.id,
        first_name: createOrUpdateDto.first_name,
        first_name_abjad: nameAbjad,
        father_name: createOrUpdateDto.father_name,
        father_name_abjad: fatherAbjad,
        mother_name: createOrUpdateDto.mother_name,
        mother_name_abjad: motherAbjad,
      });
      await this.soul_repository.save(newSoul);
    }
    return { message: 'Your operation was successful!' };
  }
}
