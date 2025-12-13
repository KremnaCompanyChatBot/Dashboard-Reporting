import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';
import { Message } from './message.entity';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat) private chatRepo: Repository<Chat>,
    @InjectRepository(Message) private messageRepo: Repository<Message>,
  ) {}

  // --- DASHBOARD (HTTP) İÇİN GEREKLİ METODLAR ---

  // Tüm sohbetleri getir (Admin/Dashboard listesi için)
  async findAll() {
    return await this.chatRepo.find({
      relations: ['assistant'], // Asistan bilgisini de getir
      order: { createdAt: 'DESC' }
    });
  }

  // Bir asistana ait sohbetleri getir
  // userId opsiyonel bırakıldı, şimdilik filtreleme yapmıyoruz ama parametreyi tutuyoruz.
  async findByAssistant(assistantId: string, userId?: string) {
    return await this.chatRepo.find({
      where: { assistantId },
      relations: ['messages'],
      order: { createdAt: 'DESC' }
    });
  }

  // --- WEBSOCKET & WIDGET İÇİN GEREKLİ METODLAR ---

  // Yeni bir sohbet başlatır veya var olanı getirir
  async findOrCreateChat(assistantId: string, userId?: string) {
    // Şimdilik her seferinde yeni chat oluşturuyoruz (Anonim chat mantığı)
    const newChat = this.chatRepo.create({
      assistantId,
      title: 'Yeni Sohbet'
    });
    return await this.chatRepo.save(newChat);
  }

  // Tek bir sohbetin detayını ve mesajlarını getir
  async getChatWithMessages(chatId: string) {
    return await this.chatRepo.findOne({
      where: { id: chatId },
      relations: ['messages'],
      order: {
        messages: {
          createdAt: 'ASC', // Mesajları eskiden yeniye sırala
        },
      },
    });
  }

  // Mesaj kaydetme
  async addMessage(chatId: string, role: 'user' | 'assistant', content: string) {
    const message = this.messageRepo.create({
      chatId,
      role,
      content,
    });
    return await this.messageRepo.save(message);
  }
}