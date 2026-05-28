import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('tokens')
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' }) 
  @JoinColumn({ name: 'userId' })
  user: User;

 
  @Column({ type: 'timestamp' })
  expireAt: Date;

  @Column({ default: true })
  isValid: boolean;
}
// model of black list token
