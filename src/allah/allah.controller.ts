import { Controller } from '@nestjs/common';
import { AllahService } from './allah.service';

@Controller('allah')
export class AllahController {
  constructor(private readonly allahService: AllahService) {}
}
