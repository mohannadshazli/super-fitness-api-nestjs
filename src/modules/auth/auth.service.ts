import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersRepository } from '../users/repository/users.repository';
import { ConfigService } from '@nestjs/config';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { hashPassword } from '../../common/security/hash.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UsersRepository,
    private readonly configService: ConfigService,
  ) { }

  async register(dto: CreateUserDto) {
    const existingUser = await this.userRepo.findOne('e.email = :email', {
      email: dto.email,
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await hashPassword(dto.password);

    const user = await this.userRepo.create({
      ...dto,
      password: hashedPassword,
    });


    return {
      message: "user created successfully",
      user,
    }
  }
}