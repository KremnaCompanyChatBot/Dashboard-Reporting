// src/chats/chats.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { ChatsService } from './chats.service';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  // Tüm sohbet geçmişini getir
  // GET /api/v1/chats
  @Get()
  findAll() {
    return this.chatsService.findAll();
  }

  // Belirli bir asistanın sohbetlerini getir
  // GET /api/v1/chats/assistant/:assistantId
  @Get('assistant/:assistantId')
  findByAssistant(@Param('assistantId') assistantId: string) {
    return this.chatsService.findByAssistant(assistantId);
  }

  // Tek bir sohbetin mesajlarını getir
  // GET /api/v1/chats/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatsService.findByAssistant(id);
  }

}