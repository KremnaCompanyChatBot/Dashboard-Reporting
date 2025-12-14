import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { Assistant } from '../assistants/assistant.entity';
import { Message } from '../chats/message.entity';
import { Chat } from '../chats/chat.entity'; // <-- Chat EKLENDİ

@Module({
  imports: [
    // Chat entity'sini buraya ekliyoruz
    TypeOrmModule.forFeature([Assistant, Message, Chat]) 
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService]
})
export class AnalyticsModule {}