import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersRepository } from '../users/repository/users.repository';
import { ConfigService } from '@nestjs/config';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { hashPassword } from '../../common/security/hash.util';
import { LoginDto } from './dto/login.dto';
import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UsersRepository,
    private readonly configService: ConfigService,
    private readonly UsersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto) {
    const user = await this.UsersService.createUser(dto);

    return {
      message: 'user created successfully',
      user,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.UsersService.validateUser(dto);
    const access_token = this.jwtService.sign(
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

    return {
      success: true,
      data: {
        access_token,
        refresh_token: refreshToken,
      },
    };
  }
}
