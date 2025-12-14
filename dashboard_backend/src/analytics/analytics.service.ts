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

  async getStats() {
    // 1. KARTLAR İÇİN GENEL SAYILAR
    const totalAssistants = await this.assistantRepo.count();
    const totalMessages = await this.messageRepo.count();
    // Sohbet sayısını "aktif oturum" olarak kabul edelim
    const activeUsers = await this.chatRepo.count(); 

    // 2. GRAFİK VERİSİ: GÜNLÜK MESAJ TRAFİĞİ (Son 7 Gün)
    // SQL: SELECT date(createdAt), count(*) FROM messages GROUP BY date ORDER BY date
    const rawTraffic = await this.messageRepo
      .createQueryBuilder('message')
      .select("TO_CHAR(message.createdAt, 'YYYY-MM-DD')", 'date') // Tarihi gün bazında al
      .addSelect("COUNT(*)", 'count')
      .where("message.createdAt > NOW() - INTERVAL '7 days'") // Son 7 gün
      .groupBy("TO_CHAR(message.createdAt, 'YYYY-MM-DD')")
      .orderBy('date', 'ASC')
      .getRawMany();

    // 3. GRAFİK VERİSİ: ASİSTAN KULLANIM ORANI
    // Hangi asistanın kaç tane 'chat' kaydı var?
    const rawUsage = await this.assistantRepo
      .createQueryBuilder('assistant')
      .leftJoin('assistant.chats', 'chat') // İlişkili sohbetleri birleştir
      .select('assistant.name', 'name')
      .addSelect('COUNT(chat.id)', 'value') // Sohbet sayısını al
      .groupBy('assistant.name')
      .getRawMany();

    return {
      totalAssistants,
      totalMessages,
      activeUsers,
      trafficData: rawTraffic, // Frontend bunu işleyecek
      assistantData: rawUsage  // Frontend bunu işleyecek
    };
  }
}