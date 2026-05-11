import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { Exercise } from './exercise.entity';
import { WorkoutGoal } from '../enums/workout.goal';
import { WorkoutLevel } from '../enums/workout.level';


@Entity('workouts')
export class Workout {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: WorkoutGoal,
  })
  goal: WorkoutGoal;

  @Column({
    type: 'enum',
    enum: WorkoutLevel,
  })
  level: WorkoutLevel;

  @Column()
  duration: number;

  @Column()
  calories: number;

  @OneToMany(
    () => Exercise,
    (exercise) => exercise.workout,
    {
      cascade: true,
      eager: true,
    },
  )
  exercises: Exercise[];
}