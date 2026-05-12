import { DataSource } from 'typeorm';
import { Exercise } from '../entities/exercise.entity';
import { AbstractRepository } from '../../../DB/repositories/abstract.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExerciseRepo extends AbstractRepository<Exercise> {
  protected readonly entity = Exercise;

  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  async findExercisesByWorkoutGoal(goal: string, page = 1, limit = 10) {
    const qb = this.repository.createQueryBuilder('e');

    // 1. هنعمل Join مع جدول الـ Workout
    qb.innerJoinAndSelect('e.workout', 'w')

      // 2. هنضيف الشرط بتاع الـ Goal
      .where('w.goal = :goal', { goal })

      // 3. نطبق الـ Pagination والترتيب عشان يتماشى مع نظام الـ Abstract بتاعك
      .orderBy('e.id', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [data, totalSize] = await qb.getManyAndCount();

    return {
      data,
      totalSize,
      totalPages: Math.ceil(totalSize / limit),
      pageSize: limit,
      pageNumber: page,
    };
  }
}
