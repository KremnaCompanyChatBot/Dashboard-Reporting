import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Chat } from '../chats/chat.entity';
import { User } from '../users/user.entity'; // User entity'sini import et

@Entity('assistants')
export class Assistant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  instructions: string;

  @Column({ default: 'gpt-3.5-turbo' })
  model: string;

  @OneToMany(() => Chat, (chat) => chat.assistant)
  chats: Chat[];

  // --- YENİ EKLENEN KISIM: SAHİPLİK İLİŞKİSİ ---
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  userId: string; // Veritabanında sahibinin ID'sini tutar
}