import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { AllahNames } from './entities/allah.entity';

@Injectable()
export class AllahService {
  constructor(
    @InjectRepository(AllahNames)
    private readonly allah_repository: Repository<AllahNames>,
  ) {}

  async getAllahNameByAbjad(abjad: number) {
    return await this.allah_repository.findOne({
      where: { number: MoreThanOrEqual(abjad) },
      order: { id: 'ASC' },
    });
  }
}
