import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UserProfileRepository } from '../users/repository/user-profile.repository';
import { ExerciseRepo } from './repo/exerises.repo';
import { WorkoutRepo } from './repo/workout.repo';
import { WorkoutLevel } from './enums/workout.level';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UsersRepository } from '../users/repository/users.repository';
import { UploadedFileResponse } from '../../common/types/uploaded-file.type';
import { WorkoutGoal } from './enums/workout.goal';

@Injectable()
export class WorkoutService {
  constructor(
    private readonly exerciseRepo: ExerciseRepo,
    private readonly userProfileRepo: UserProfileRepository,
    private readonly workoutRepo: WorkoutRepo,
    private readonly UsersRepository: UsersRepository,
  ) {}

  async createExercise(
    workoutId: number,
    dto: CreateExerciseDto & UploadedFileResponse,
  ) {
    return this.exerciseRepo.create({
      ...dto,
      workoutId,
    });
  }

  async getExercisesByWorkout(workoutId: number) {
    const result = await this.exerciseRepo.findAll({
      where: 'e.workoutId = :workoutId',
      params: { workoutId },
    });

    return result.data;
  }

  async getAllWorkouts() {
    const result = await this.workoutRepo.findAll({
      where: '1=1',
      params: {},
    });

    return result.data;
  }

  async createWorkout(dto: CreateWorkoutDto) {
    return this.workoutRepo.create(dto);
  }

  async getRecommendations(userId: string) {
    console.log(userId);
    const profile = await this.userProfileRepo.findOne('e.userId = :userId', {
      userId,
    });
    if (!profile) {
      throw new Error('Profile not found');
    }

    const heightInMeters = profile.height / 100;

    const bmi = profile.weight / (heightInMeters * heightInMeters);

    let suggestedLevel: WorkoutLevel = WorkoutLevel.BEGINNER;

    if (bmi > 25) {
      suggestedLevel = WorkoutLevel.ADVANCED;
    } else if (bmi >= 18.5) {
      suggestedLevel = WorkoutLevel.INTERMEDIATE;
    }

    const workouts = await this.workoutRepo.findAll({
      where: 'e.goal = :goal AND e.level = :level',
      params: {
        goal: profile.goal,
        level: suggestedLevel,
      },
    });

    return {
      user: profile,
      bmi,
      suggestedLevel,
      recommendations: workouts.data,
    };
  }

  async getExercisesByGoal(goal: WorkoutGoal, page: number, limit: number) {
    return await this.exerciseRepo.findExercisesByWorkoutGoal(
      goal,
      page,
      limit,
    );
  }
}
