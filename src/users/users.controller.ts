import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateDto } from './dto/update.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':phone_number')
  async findByPhoneNumber(@Param('phone_number') phone_number: string) {
    return await this.usersService.findByPhoneNumber(phone_number);
  }

  @UseGuards(AuthGuard)
  @Post('update')
  async update(@Request() req, @Body() updateDto: UpdateDto) {
    return await this.usersService.update(req.user.id, updateDto);
  }
}
