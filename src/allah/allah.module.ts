import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllahService } from './allah.service';
import { AllahNames } from './entities/allah.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AllahNames])],
  controllers: [],
  providers: [AllahService],
})
export class AllahModule {}
