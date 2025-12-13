// src/analytics/analytics.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { Assistant } from '../assistants/assistant.entity';
import { Message } from '../chats/message.entity';

@Module({
  imports: [
    // Veritabanı tablolarına erişim izni veriyoruz
    TypeOrmModule.forFeature([Assistant, Message])
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService]
})
export class AnalyticsModule {}