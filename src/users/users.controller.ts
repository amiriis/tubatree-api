import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':phone_number')
  async findByPhoneNumber(@Param('phone_number') phoneNumber: string) {
    return await this.usersService.findByPhoneNumber(phoneNumber);
  }
}
