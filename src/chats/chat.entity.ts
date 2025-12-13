// src/chats/chat.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Assistant } from '../assistants/assistant.entity';
import { Message } from './message.entity';

@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Assistant, (assistant) => assistant.chats, { onDelete: 'CASCADE' })
  assistant: Assistant;

  @Column()
  assistantId: string;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];
}