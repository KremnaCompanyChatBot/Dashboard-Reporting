// src/assistants/assistant.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Chat } from '../chats/chat.entity';

@Entity('assistants')
export class Assistant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  instructions: string; // AI'a verilecek prompt talimatı (Squad 5 için önemli)

  @Column({ default: 'gpt-3.5-turbo' })
  model: string;

  @OneToMany(() => Chat, (chat) => chat.assistant)
  chats: Chat[];
}