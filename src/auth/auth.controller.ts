import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OtpDto } from './dto/otp.dto';
import { VerifyDto } from './dto/verify.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('otp')
  async otp(@Body() otpDto: OtpDto) {
    return await this.authService.otp(otpDto);
  }

  @Post('verify')
  async verify(@Body() verifyDto: VerifyDto) {
    return await this.authService.verify(verifyDto);
  }
}
