// src/chats/chats.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';
import { Message } from './message.entity';
import { Assistant } from '../assistants/assistant.entity';
import axios from 'axios'; // Axios'u import ettik

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat) private chatRepo: Repository<Chat>,
    @InjectRepository(Message) private messageRepo: Repository<Message>,
    // Assistant entity'sini kullanmak için inject ediyoruz
    @InjectRepository(Assistant) private assistantRepo: Repository<Assistant>,
  ) {}

  // --- SQUAD 3 (WIDGET) İÇİN ---
  async findOrCreateChat(assistantId: string) {
    const chat = this.chatRepo.create({
      assistantId,
      title: 'Yeni Ziyaretçi Sohbeti'
    });
    return await this.chatRepo.save(chat);
  }

  async addMessage(chatId: string, role: 'user' | 'assistant', content: string) {
    const message = this.messageRepo.create({
      chatId,
      role,
      content
    });
    return await this.messageRepo.save(message);
  }

  // --- SQUAD 5 (AI CORE - MISTRAL) ---
  async generateAIResponse(chatId: string, userMessage: string) {
    // 1. Chat ve Asistan bilgilerini çek
    const chat = await this.chatRepo.findOne({
      where: { id: chatId },
      relations: ['assistant']
    });

    if (!chat || !chat.assistant) {
      return "Hata: Asistan verisi bulunamadı.";
    }

    // 2. Asistanın "System Prompt"unu al
    const systemInstruction = chat.assistant.instructions || "Sen yardımsever bir asistansın.";

    try {
      // 3. Mistral API'ye İstek At
      const response = await axios.post(
        "https://api.mistral.ai/v1/chat/completions",
        {
          model: "mistral-tiny", // Hızlı ve ucuz model
          messages: [
            // SİSTEM MESAJI: Asistana kim olduğunu burada söylüyoruz
            { role: "system", content: systemInstruction },
            // KULLANICI MESAJI
            { role: "user", content: userMessage }
          ],
          temperature: 0.7,
        },
        {
          headers: {
            "Authorization": `Bearer ${process.env.MISTRAL_API_KEY}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        }
      );

      // 4. Cevabı al ve döndür
      const aiText = response.data.choices[0].message.content;
      return aiText;

    } catch (error) {
      console.error("Mistral API Hatası:", error.response?.data || error.message);
      return "Üzgünüm, şu an beynimde (API) bir sorun var. Daha sonra tekrar dene.";
    }
  }

  // --- SQUAD 2 (DASHBOARD) İÇİN ---
  async findAll() {
    return await this.chatRepo.find({
      relations: ['messages', 'assistant'],
      order: { createdAt: 'DESC' }
    });
  }

  async findByAssistant(assistantId: string) {
    return await this.chatRepo.find({
      where: { assistantId },
      relations: ['messages'],
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: string) {
    const chat = await this.chatRepo.findOne({
      where: { id },
      relations: ['messages'],
      order: { messages: { createdAt: 'ASC' } }
    });
    if (!chat) throw new NotFoundException('Sohbet bulunamadı');
    return chat;
  }


  
}