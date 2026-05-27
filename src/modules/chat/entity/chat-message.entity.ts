import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class ChatMessage {

  @PrimaryGeneratedColumn()
  id: number;

  // 👤 بدل socketId → userId (JWT user)
  @Column()
  userId: string;

  // 💬 user / assistant
  @Column()
  role: string;

  // 🧠 message content
  @Column('text')
  content: string;

  // 🕒 timestamp
  @CreateDateColumn()
  createdAt: Date;
}