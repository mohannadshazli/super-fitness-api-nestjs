import {
  Injectable,
  BadRequestException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { UsersRepository } from '../users/repository/users.repository';
import { ConfigService } from '@nestjs/config';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SendDto } from './dto/sendOtp';
import { OptRepository } from './reposatories/opt.repository';
import { randomInt } from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';
import { TokenRepository } from './reposatories/token.repository';
import { ResetPasswordDto } from './dto/ResetPasswordDto';
import { hashPassword } from '../../common/security/hash.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UsersRepository,
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => UsersService)) private UsersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly OptRepository: OptRepository,
    private MailerService: MailerService,
    private readonly tokenRepository: TokenRepository,
  ) {}

  public async generateOtp(email: string) {
    const existingOtp = await this.OptRepository.findOne('e.email = :email', {
      email,
    });

    if (existingOtp) {
      await this.OptRepository.delete('e.email = :email', { email });
    }

    const otpCode = randomInt(100000, 999999).toString();

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);

    await this.OptRepository.create({
      email,
      otp: otpCode,
      expiresAt,
    });

    await this.MailerService.sendMail({
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP is ${otpCode}`,
    });

    return otpCode;
  }

  async register(dto: CreateUserDto) {
    const user = await this.UsersService.createUser(dto);
    return {
      message: 'user created successfully',
      user,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.UsersService.validateUser(dto);

    const accessToken = this.jwtService.sign(
      { id: user.id },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
      },
    );

    const refreshToken = this.jwtService.sign(
      { id: user.id },
      {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
      },
    );

    const accessExpireAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const refreshExpireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await this.tokenRepository.create({
      token: accessToken,
      user,
      expireAt: accessExpireAt,
      isValid: true,
    });

    await this.tokenRepository.create({
      token: refreshToken,
      user,
      expireAt: refreshExpireAt,
      isValid: true,
    });

    return {
      success: true,
      data: {
        access_token: accessToken,
        refresh_token: refreshToken,
      },
    };
  }

  async sendOtp(data: SendDto) {
    const user = await this.UsersService.UserExistsByEmail(data.email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    await this.generateOtp(data.email);

    return {
      success: true,
      message: 'OTP sent successfully',
    };
  }

  async forgetPassword(data: SendDto) {
    const user = await this.UsersService.UserExistsByEmail(data.email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    await this.generateOtp(data.email);

    return {
      success: true,
      message: 'OTP sent successfully',
    };
  }

  async resetpassword(data: ResetPasswordDto) {
    const { email, password, otp } = data;

    const user = await this.UsersService.UserExistsByEmail(email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const existingOtp = await this.OptRepository.findOne('e.email = :email', {
      email,
    });

    if (!existingOtp) {
      throw new BadRequestException('Invalid OTP');
    }

    if (existingOtp.otp !== otp) {
      throw new BadRequestException('Invalid OTP');
    }

    const hashedPassword = await hashPassword(password);

    await this.userRepo.update(
      'id = :id',
      { id: user.id },
      { password: hashedPassword },
    );

    await this.OptRepository.delete('e.email = :email', { email });

    return {
      success: true,
      message: 'Password reset successfully',
    };
  }
}
