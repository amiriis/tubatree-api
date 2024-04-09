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
      createOrUpdateDto.firstName,
    );
    const fatherAbjad = this.tubaService.generateAbjadByName(
      createOrUpdateDto.fatherName,
    );
    const motherAbjad = this.tubaService.generateAbjadByName(
      createOrUpdateDto.motherName,
    );

    const allahName = await this.allahService.getAllahNameByAbjad(
      nameAbjad + motherAbjad + fatherAbjad,
    );

    const emamNumber = this.tubaService.getEmamNumberByAbjad(
      nameAbjad + motherAbjad,
    );

    const movakelKhas = this.tubaService.getMovakelKhasByAbjad(nameAbjad);
    const movakelAum = this.tubaService.getMovakelAumByAbjad(
      nameAbjad + motherAbjad,
    );
    const oun = this.tubaService.getOunByAbjad(nameAbjad + motherAbjad);
    const jamaliOrJalali = this.tubaService.getJamaliOrJalaliByName(
      createOrUpdateDto.firstName,
    );

    const asarAfaghi = this.tubaService.getAsarAfaghiByName(
      createOrUpdateDto.firstName,
    );

    const soul = await this.soul_repository.findOne({ where: { userId: id } });

    if (soul) {
      await this.soul_repository.update(
        { id: soul.id },
        {
          allahNameId: allahName.id,
          emamNumber: emamNumber,
          soulNumber: nameAbjad + motherAbjad,
          movakelKhas,
          movakelAum,
          oun,
          jamaliOrJalali,
          asarAfaghi,
          firstName: createOrUpdateDto.firstName,
          firstNameAbjad: nameAbjad,
          fatherName: createOrUpdateDto.fatherName,
          fatherNameAbjad: fatherAbjad,
          motherName: createOrUpdateDto.motherName,
          motherNameAbjad: motherAbjad,
        },
      );
    } else {
      const newSoul = this.soul_repository.create({
        userId: id,
        allahNameId: allahName.id,
        emamNumber: emamNumber,
        soulNumber: nameAbjad + motherAbjad,
        movakelKhas,
        movakelAum,
        oun,
        jamaliOrJalali,
        firstName: createOrUpdateDto.firstName,
        firstNameAbjad: nameAbjad,
        fatherName: createOrUpdateDto.fatherName,
        fatherNameAbjad: fatherAbjad,
        motherName: createOrUpdateDto.motherName,
        motherNameAbjad: motherAbjad,
      });
      await this.soul_repository.save(newSoul);
    }
    return { message: 'Your operation was successful!' };
  }
}
