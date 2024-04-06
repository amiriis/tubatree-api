import { Module } from '@nestjs/common';
import { SoulsService } from './souls.service';
import { SoulsController } from './souls.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Souls } from './entities/soul.entity';
import { AllahNames } from 'src/allah/entities/allah.entity';
import { AllahService } from 'src/allah/allah.service';
import { TubaService } from 'src/tuba/tuba.service';

@Module({
  imports: [TypeOrmModule.forFeature([Souls, AllahNames])],
  controllers: [SoulsController],
  providers: [SoulsService, TubaService, AllahService],
})
export class SoulsModule {}
