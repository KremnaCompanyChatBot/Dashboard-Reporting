// src/analytics/analytics.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assistant } from '../assistants/assistant.entity';
import { Message } from '../chats/message.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Assistant) 
    private assistantRepo: Repository<Assistant>,
    
    @InjectRepository(Message) 
    private messageRepo: Repository<Message>,
  ) {}

  async getStats() {
    // Veritabanından gerçek sayıları al
    const totalAssistants = await this.assistantRepo.count();
    const totalMessages = await this.messageRepo.count();
    
    // User tablomuz olmadığı için şimdilik bunu sabit bırakıyoruz veya
    // benzersiz chatId sayısını aktif kullanıcı olarak sayabiliriz.
    const activeUsers = 1; 

    return {
      totalAssistants,
      totalMessages,
      activeUsers
    };
  }
}