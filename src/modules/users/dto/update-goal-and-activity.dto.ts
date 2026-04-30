import { IsEnum } from 'class-validator';
import { ActivityLevel } from './user-activity-level.enum';
import { UserGoal } from './user-goal.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGoalDto {
  @ApiProperty({
    enum: UserGoal,
    enumName: 'UserGoal',
    description: 'The fitness goal of the user',
    example: UserGoal.LOSE_WEIGHT,
    type: String,
  })
  @IsEnum(UserGoal)
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
