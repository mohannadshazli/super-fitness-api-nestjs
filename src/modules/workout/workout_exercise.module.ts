import { Module } from '@nestjs/common';
import { WorkoutService } from './workout_exercise.service';
import { WorkoutController } from './workout._exercise.controller';
import { UsersModule } from '../users/users.module';
import { WorkoutRepo } from './repo/workout.repo';
import { ExerciseRepo } from './repo/exerises.repo';
import { UsersRepository } from '../users/repository/users.repository';

@Module({
  controllers: [WorkoutController],
  providers: [WorkoutService,ExerciseRepo,WorkoutRepo,UsersRepository],
  imports: [UsersModule],
})
export class WorkoutModule { }
