import {
  IsString,
  IsNumber,
  IsEnum,
} from 'class-validator';

import { WorkoutGoal } from '../enums/workout.goal';
import { WorkoutLevel } from '../enums/workout.level';

export class CreateWorkoutDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(WorkoutGoal)
  goal: WorkoutGoal;

  @IsEnum(WorkoutLevel)
  level: WorkoutLevel;

  @IsNumber()
  duration: number;

  @IsNumber()
  calories: number;
}