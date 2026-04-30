import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtService } from "@nestjs/jwt"
import { OptRepository } from './reposatories/opt.repository';
import { TokenRepository } from './reposatories/token.repository';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../../common/guards/auth.guard';



@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService,OptRepository,TokenRepository,{
    provide: APP_GUARD,
    useClass: AuthGuard,
  }],
})
export class AuthModule { }
