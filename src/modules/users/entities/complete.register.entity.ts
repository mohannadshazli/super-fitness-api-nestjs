import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { ActivityLevel } from '../dto/user-activity-level.enum';
import { WorkoutGoal } from '../../workout/enums/workout.goal';

@Entity('user_profiles')
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  weight: number;

  @Column({ nullable: true })
  height: number;

  @Column({
    type: 'enum',
    enum: WorkoutGoal,
    nullable: true,
  })
  goal: WorkoutGoal;

  @Column({
    type: 'enum',
    enum: ActivityLevel,
    nullable: true,
  })
  activity_level: ActivityLevel;

  @Column({ default: 0 })
  registration_step: number;

  @CreateDateColumn()
  created_at: Date;
}
