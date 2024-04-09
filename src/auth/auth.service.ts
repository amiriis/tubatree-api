import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { OtpDto } from './dto/otp.dto';
import { VerifyDto } from './dto/verify.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly user_repository: Repository<Users>,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async otp(otpDto: OtpDto) {
    const user = await this.userService.findByPhoneNumber(otpDto.phoneNumber);
    let code: string = null;
    if (user) {
      while (!code) {
        const newCode = this.generateOTP();
        if (user.verifyCode !== newCode) {
          code = newCode;
          break;
        }
      }
      await this.user_repository.update(
        { id: user.id },
        {
          verifyCode: code,
          verifyCodeExpireAt: this.addMinutes(new Date(), 10),
        },
      );
    } else {
      code = this.generateOTP();
      const newUser = this.user_repository.create({
        phoneNumber: otpDto.phoneNumber,
        verifyCode: code,
        verifyCodeExpireAt: this.addMinutes(new Date(), 10),
      });
      await this.user_repository.save(newUser);
    }

    // todo send sms code

    return { message: 'Your operation was successful!' };
  }

  async verify(verifyDto: VerifyDto) {
    const user = await this.userService.findByPhoneNumber(
      verifyDto.phoneNumber,
    );
    if (!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);

    if (user.verifyCode !== verifyDto.verifyCode)
      throw new HttpException(
        'The verification code is incorrect or has expired!',
        HttpStatus.BAD_REQUEST,
      );

    const now = new Date().getTime();
    const expire_at = new Date(user.verifyCodeExpireAt).getTime();

    if (expire_at < now)
      throw new HttpException(
        'The verification code is incorrect or has expired!',
        HttpStatus.BAD_REQUEST,
      );

    const accessToken = this.jwtService.sign({
      sub: user.id,
    });

    return { accessToken };
  }

  generateOTP() {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }

  addMinutes(date: Date, minutes: number) {
    const newDate = new Date(date);
    newDate.setMinutes(date.getMinutes() + minutes);
    return newDate;
  }
}
