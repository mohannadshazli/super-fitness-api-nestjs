import { IsString, IsNumber, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // استيراد الـ Decorator

import { WorkoutGoal } from '../enums/workout.goal';
import { WorkoutLevel } from '../enums/workout.level';

export class CreateWorkoutDto {
  @ApiProperty({
    example: 'Morning Yoga Flow',
    description: 'The title of the workout',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'A relaxing yoga session to start your day.',
    description: 'Detailed description of the workout routine',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    enum: WorkoutGoal,
    example: WorkoutGoal.FITNESS, // أو القيمة اللي تحبها كـ default
    description: 'The main objective of the workout',
  })
  @IsEnum(WorkoutGoal)
  goal: WorkoutGoal;

  @ApiProperty({
    enum: WorkoutLevel,
    example: WorkoutLevel.BEGINNER,
    description: 'Difficulty level of the workout',
  })
  @IsEnum(WorkoutLevel)
  level: WorkoutLevel;

  @ApiProperty({
    example: 45,
    description: 'Duration in minutes',
  })
  @IsNumber()
  duration: number;

  @ApiProperty({
    example: 300,
    description: 'Estimated calories burned',
  })
  @IsNumber()
  calories: number;
}
