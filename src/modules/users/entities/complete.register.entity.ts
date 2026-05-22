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

  @OneToOne(() => User, (user) => user.profile, {
  onDelete: 'CASCADE',
})
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'varchar', nullable: true })
  gender: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ type: 'float', nullable: true })
  weight: number;

  @Column({ type: 'float', nullable: true })
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


  @Column({ type: 'text', nullable: true })
  profile_picture: string;


  @Column({ type: 'float', default: 0 })
  daily_calories: number;


  @Column({ default: 0 })
  registration_step: number;

  @CreateDateColumn()
  created_at: Date;
}
