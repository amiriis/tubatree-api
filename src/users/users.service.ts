import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly user_repository: Repository<Users>,
  ) {}

  async findAll() {
    return await this.user_repository.find();
  }

  async findByPhoneNumber(phoneNumber: string) {
    return await this.user_repository.findOne({ where: { phoneNumber } });
  }

  async findById(id: number) {
    return await this.user_repository.findOne({ where: { id } });
  }
}
