import { IsEnum, IsIn } from 'class-validator';
import { ActivityLevel } from './user-activity-level.enum';
import type { UserGoal } from './user-goal.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGoalDto {
   @ApiProperty({
    description: 'The fitness goal of the user',
    example: 'LOSE_WEIGHT',
    enum: ['LOSE_WEIGHT', 'GAIN_MUSCLE', 'FITNESS'],
    type: String,
  })
  @IsIn(['LOSE_WEIGHT', 'GAIN_MUSCLE', 'FITNESS'])
  goal: UserGoal;
}

export class UpdateActivityLevelDto {
  @ApiProperty({
    enum: ActivityLevel,
    enumName: 'ActivityLevel',
    description: 'The activity level of the user',
    example: ActivityLevel.BEGINNER,
    type: String,
  })
  @IsEnum(ActivityLevel)
  activityLevel: ActivityLevel;
}
