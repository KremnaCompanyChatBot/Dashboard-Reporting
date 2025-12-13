import { Controller, Get, Param, Query } from '@nestjs/common';
import { ChatsService } from './chats.service';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get()
  findAll() {
    return this.chatsService.findAll();
  }

  @Get('assistant/:assistantId')
  findByAssistant(
    @Param('assistantId') assistantId: string,
    @Query('userId') userId?: string,
  ) {
    return this.chatsService.findByAssistant(assistantId, userId);
  }
  
  // Belirli bir chat'in mesajlarını API üzerinden çekmek gerekirse:
  @Get(':id')
  getChat(@Param('id') id: string) {
    return this.chatsService.getChatWithMessages(id);
  }
}