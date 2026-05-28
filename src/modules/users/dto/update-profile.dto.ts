import {
  IsOptional,
  IsString,
  MaxLength,
  IsNumber,
  IsPositive,
  IsEnum,
  IsUrl,
} from 'class-validator';

import { WorkoutGoal } from '../../workout/enums/workout.goal';
import { ActivityLevel } from '../dto/user-activity-level.enum';
import { Gender } from './complete-profile.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserProfileDto {
    @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  first_name?: string;
    @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
    type: String,
  })

  @IsOptional()
  @IsString()
  @MaxLength(50)
  last_name?: string;

  @ApiProperty({
    enum: Gender,
    enumName: 'Gender',
    description: 'The gender of the user',
    example: Gender.MALE,
    type: String,
  })
  @IsEnum(Gender)
  @IsString()
  gender?: Gender;

  @ApiProperty({
    description: 'The age of the user',
    example: 30,
    type: Number,
  })
  @IsNumber()
  age?: number;

  @ApiProperty({
    description: 'The weight of the user in kg',
    example: 70,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  weight?: number;

    @ApiProperty({
    description: 'The height of the user in cm',
    example: 175,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  height?: number;

    @ApiProperty({
    enum: WorkoutGoal,
    enumName: 'WorkoutGoal',
    description: 'The fitness goal of the user',    
    example: WorkoutGoal.LOSE_WEIGHT,
    type: String,
    })
  @IsOptional()
  @IsEnum(WorkoutGoal)
  goal?: WorkoutGoal;

    @ApiProperty({
    enum: ActivityLevel,
    enumName: 'ActivityLevel',
    description: 'The activity level of the user',
    example: ActivityLevel.BEGINNER,
    type: String,
  })
  @IsOptional()
  @IsEnum(ActivityLevel)
  activity_level?: ActivityLevel;

    @ApiProperty({
    description: 'The profile picture URL of the user',
    example: 'https://example.com/profile.jpg',
  })
  @IsOptional()
  @IsUrl()
  profile_picture?: string;
}