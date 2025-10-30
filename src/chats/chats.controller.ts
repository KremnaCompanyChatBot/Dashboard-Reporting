import { Controller, Get, Param, Query } from '@nestjs/common';
import { ChatsService } from './chats.service';

@Controller('api/v1/chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get(':assistantId')
  find(@Param('assistantId') assistantId: string, @Query('userId') userId?: string) {
    return this.chatsService.findByAssistant(assistantId, userId);
  }

   @Get()
  findAll() {
    return this.chatsService.findAll();
  }
  
}
