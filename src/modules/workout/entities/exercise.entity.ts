import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Workout } from './workout.entity';
import { Exclude } from 'class-transformer';

@Entity('exercises')
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  sets: number;

  @Column({ nullable: true })
  reps: number;

  @Column({ nullable: true })
  duration_in_minutes: number;

  @Column({ nullable: true })
  rest_in_seconds: number;

  @Column({ nullable: true })
  image_url: string;

  @Exclude()
  @Column({ nullable: true })
  image_public_id: string;

  @Column({ nullable: true })
  video_url: string;

  @Exclude()
  @Column({ nullable: true })
  video_public_id: string;

  @ManyToOne(() => Workout, (workout) => workout.exercises, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workoutId' })
  workout: Workout;

  @Column()
  workoutId: number;
}
