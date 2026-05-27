import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { SendDto } from './dto/sendOtp';
import { ResetPasswordDto } from './dto/ResetPasswordDto';
import { Public } from '../../common/decorators/public_decorator';
import type { AuthRequest } from '../../common/types/req.type';
import { AuthGuard } from '../../common/guards/auth.guard';

@ApiTags('Auth')
@Controller('auth')

export class AuthController {
  constructor(private authService: AuthService) { }
  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }
  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  @Public()
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
  @Public()
  @Post('send-otp')
  @ApiOperation({ summary: 'Send OTP to user' })
  @ApiBody({ type: SendDto })
  @ApiResponse({
    status: 200,
    description: 'OTP sent successfully',
  })
  sendOtp(@Body() dto: SendDto) {
    return this.authService.sendOtp(dto);
  }
  @Public()
  @Post('forget-password')
  @ApiOperation({ summary: 'Request password reset (send OTP)' })
  @ApiBody({ type: SendDto })
  @ApiResponse({
    status: 200,
    description: 'OTP sent for password reset',
  })
  forgetPassword(@Body() data: SendDto) {
    return this.authService.forgetPassword(data);
  }
  @Public()
  @Post('reset-password')
  @ApiOperation({ summary: 'Reset user password using OTP' })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Password reset successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid or expired OTP',
  })
  resetPassword(@Body() data: ResetPasswordDto) {
    return this.authService.resetpassword(data);
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  logout(@Req() req: AuthRequest) {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(req.user);
    return this.authService.logout(token!, req.user.id);
  }
}
