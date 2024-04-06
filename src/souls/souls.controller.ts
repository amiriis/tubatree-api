import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateOrUpdateDto } from './dto/createOrUpdate.dto';
import { SoulsService } from './souls.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('soul')
@UseGuards(AuthGuard)
export class SoulsController {
  constructor(private readonly soulsService: SoulsService) {}

  @Get('')
  async findByUserId(@Request() req) {
    return await this.soulsService.findByUserId(req.user.id);
  }

  @Post('create_or_update')
  async createOrUpdate(
    @Request() req,
    @Body() createOrUpdateDto: CreateOrUpdateDto,
  ) {
    return await this.soulsService.createOrUpdate(
      req.user.id,
      createOrUpdateDto,
    );
  }
}
