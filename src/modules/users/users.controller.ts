import {
  Controller,
  Body,
  Patch,
  Req,
  Post,
  Get,
  BadRequestException,
  UseGuards,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { AuthRequest } from '../../common/types/req.type';
import type { Gender } from './dto/gender.type';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  UpdateActivityLevelDto,
  UpdateGoalDto,
} from './dto/update-goal-and-activity.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { CompleteProfileDto } from './dto/complete-profile.dto';
import { CheckEmailDto } from './dto/check-email.dto';
import { ResetEmailDto } from './dto/reset-email.dto';
import { Public } from '../../common/decorators/public_decorator';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserProfileDto } from './dto/update-profile.dto';

@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiBody({
    type: CreateUserDto,
    description: 'User created data',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Post('get-or-create-profile')
  @ApiOperation({ summary: 'Get or create user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved or created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  getOrCreateProfile(@Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.usersService.getOrCreateProfile(userId);
  }

  @Patch('gender')
  updateGender(@Req() req: AuthRequest, @Body('gender') gender: Gender) {
    const userId = req.user.id;
    return this.usersService.updateGender(userId, gender);
  }

  @Patch('age')
  updateAge(@Req() req: AuthRequest, @Body('age') age: number) {
    const userId = req.user.id;
    return this.usersService.updateAge(userId, age);
  }

  @Patch('weight')
  updateWeight(@Req() req: AuthRequest, @Body('weight') weight: number) {
    const userId = req.user.id;
    return this.usersService.updateWeight(userId, weight);
  }

  @Patch('height')
  updateHeight(@Req() req: AuthRequest, @Body('height') height: number) {
    const userId = req.user.id;
    return this.usersService.updateHeight(userId, height);
  }

  @Patch('goal')
  @ApiBody({ type: UpdateGoalDto })
  updateGoal(@Req() req: AuthRequest, @Body() updateGoalDto: UpdateGoalDto) {
    const userId = req.user.id;
    return this.usersService.updateGoal(userId, updateGoalDto.goal);
  }

  @Patch('activity-level')
  @ApiBody({ type: UpdateActivityLevelDto })
  updateActivityLevel(
    @Req() req: AuthRequest,
    @Body() updateActivityLevelDto: UpdateActivityLevelDto,
  ) {
    const userId = req.user.id;
    return this.usersService.updateActivityLevel(
      userId,
      updateActivityLevelDto.activityLevel,
    );
  }

  @Post('complete-profile')
  @ApiBody({ type: CompleteProfileDto })
  completeProfile(
    @Req() req: AuthRequest,
    @Body() completeProfileDto: CompleteProfileDto,
  ) {
    const userId = req.user?.id;
    if (!userId) {
      throw new BadRequestException('Authenticated user ID is missing');
    }

    return this.usersService.completeProfile(userId, completeProfileDto);
  }
  @Patch('update-profile')
  updateProfile(
    @Req() req: AuthRequest,
    @Body() updateProfileDto: UpdateUserProfileDto,
  ) {
    const userId = req.user?.id;
    if (!userId) {
      throw new BadRequestException('Authenticated user ID is missing');
    }

    return this.usersService.updateProfile(userId,updateProfileDto);
  }
  @Get('get-profile')
  getProfile(
    @Req() req: AuthRequest,
  ) {
    const userId = req.user?.id;
    if (!userId) {
      throw new BadRequestException('Authenticated user ID is missing');
    }

    return this.usersService.getProfile(userId);
  }

  @Get('get-user-data')
  getUserData(@Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.usersService.getUserData(userId);
  }

  @Post('update-user-email')
  @ApiOperation({ summary: 'Update user email' })
  @ApiBody({
    type: CheckEmailDto,
    description: 'New email to update',
  })
  @ApiResponse({
    status: 200,
    description: 'Otp sent to new email successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  updateUserEmail(@Req() req: AuthRequest, @Body() dto: CheckEmailDto) {
    const userId = req.user.id;
    return this.usersService.updateUserEmail(userId, dto.email);
  }

  @Post('reset-user-email')
  @ApiOperation({ summary: 'Reset user email' })
  @ApiBody({
    type: ResetEmailDto,
    description: 'New email and OTP to reset',
  })
  @ApiResponse({
    status: 200,
    description: 'Email updated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  resetUserEmail(@Req() req: AuthRequest, @Body() dto: ResetEmailDto) {
    const userId = req.user.id;
    return this.usersService.resetUserEmail(userId, dto.email, dto.otp);
  }

  @Post('update-password')
  @ApiOperation({ summary: 'Update user password' })
  @ApiBody({ type: UpdatePasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Password updated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid password',
  })
  updatePassword(@Req() req: AuthRequest, @Body() data: UpdatePasswordDto) {
    return this.usersService.updatePassword(
      req.user.id,
      data.oldPassword,
      data.newPassword,
    );
  }
}
