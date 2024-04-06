import { Module } from '@nestjs/common';
import { AllahService } from './allah.service';
import { AllahController } from './allah.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllahNames } from './entities/allah.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AllahNames])],
  controllers: [AllahController],
  providers: [AllahService],
})
export class AllahModule {}
