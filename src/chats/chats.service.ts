import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';
import { Message } from './message.entity';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat) private chatRepo: Repository<Chat>,
    // Message entity'sinin import edildiğinden emin ol
    @InjectRepository(Message) private messageRepo: Repository<Message>,
  ) {}

  // Widget bağlantısı için: Yeni sohbet başlat veya var olanı bul
  async findOrCreateChat(assistantId: string) {
    // Gerçek senaryoda burada ziyaretçi ID kontrolü yapılır
    const chat = this.chatRepo.create({
      assistantId,
      title: 'Yeni Ziyaretçi'
    });
    return await this.chatRepo.save(chat);
  }

  // Mesaj kaydetme (Hem kullanıcı hem AI için)
  async addMessage(chatId: string, role: 'user' | 'assistant', content: string) {
    const message = this.messageRepo.create({
      chatId,
      role,
      content
    });
    return await this.messageRepo.save(message);
  }

  // Dashboard için: Tüm sohbetleri getir
  async findAll() {
    return await this.chatRepo.find({
      relations: ['messages'],
      order: { createdAt: 'DESC' }
    });
  }

  // Dashboard için: Tek bir asistanın sohbetlerini getir
  async findByAssistant(assistantId: string) {
    return await this.chatRepo.find({
      where: { assistantId },
      relations: ['messages'],
      order: { createdAt: 'DESC' }
    });
  }
}