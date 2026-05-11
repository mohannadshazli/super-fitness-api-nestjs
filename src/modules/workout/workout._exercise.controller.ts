import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { WorkoutService } from './workout_exercise.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import type { AuthRequest } from '../../common/types/req.type';
import { CreateWorkoutDto } from './dto/create-workout.dto';

@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) { }


  @Post('exercises/:workoutId')
  createExercise(
    @Param('workoutId') workoutId: string,
    @Body() dto: CreateExerciseDto,
  ) {
    return this.workoutService.createExercise(
      Number(workoutId),
      dto,
    );
  }

  @Get('exercises/:workoutId')
  getExercises(@Param('workoutId') id: string) {
    return this.workoutService.getExercisesByWorkout(
      Number(id),
    );
  }


  @Post("/create-workout")
  createWorkout(@Body() dto: CreateWorkoutDto) {
    return this.workoutService.createWorkout(dto);
  }

  @Get('recommend')
  getRecommendations(@Req() req: AuthRequest) {
    const userId = req.user.id;
    return this.workoutService.getRecommendations(
      userId,
    );
  }
}
