import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assistant } from '../assistants/assistant.entity';
import { Message } from '../chats/message.entity';
import { Chat } from '../chats/chat.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Assistant) private assistantRepo: Repository<Assistant>,
    @InjectRepository(Message) private messageRepo: Repository<Message>,
    @InjectRepository(Chat) private chatRepo: Repository<Chat>,
  ) {}

  async getStats(userId: string) { // <-- UserId parametresi alıyor
    
    // 1. Sadece benim asistanlarımı say
    const totalAssistants = await this.assistantRepo.count({ where: { userId } });

    // 2. Benim asistanlarıma ait mesajları say (Biraz kompleks bir sorgu)
    const totalMessages = await this.messageRepo
      .createQueryBuilder('message')
      .innerJoin('message.chat', 'chat')
      .innerJoin('chat.assistant', 'assistant')
      .where('assistant.userId = :userId', { userId })
      .getCount();

    // 3. Benim asistanlarıma ait sohbetler
    const activeUsers = await this.chatRepo
      .createQueryBuilder('chat')
      .innerJoin('chat.assistant', 'assistant')
      .where('assistant.userId = :userId', { userId })
      .getCount();

    // GRAFİKLER (Kullanıcıya özel filtreli)
    const rawTraffic = await this.messageRepo
      .createQueryBuilder('message')
      .innerJoin('message.chat', 'chat')
      .innerJoin('chat.assistant', 'assistant')
      .select("TO_CHAR(message.createdAt, 'YYYY-MM-DD')", 'date')
      .addSelect("COUNT(*)", 'count')
      .where("message.createdAt > NOW() - INTERVAL '7 days'")
      .andWhere("assistant.userId = :userId", { userId }) // <-- KULLANICI FİLTRESİ
      .groupBy("TO_CHAR(message.createdAt, 'YYYY-MM-DD')")
      .orderBy('date', 'ASC')
      .getRawMany();

    const rawUsage = await this.assistantRepo
      .createQueryBuilder('assistant')
      .leftJoin('assistant.chats', 'chat')
      .select('assistant.name', 'name')
      .addSelect('COUNT(chat.id)', 'value')
      .where('assistant.userId = :userId', { userId }) // <-- KULLANICI FİLTRESİ
      .groupBy('assistant.name')
      .getRawMany();

    return {
      totalAssistants,
      totalMessages,
      activeUsers,
      trafficData: rawTraffic,
      assistantData: rawUsage
    };
  }
}