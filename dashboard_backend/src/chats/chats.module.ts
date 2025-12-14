import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { ChatsGateway } from './chats.gateway';
import { Chat } from './chat.entity';
import { Message } from './message.entity';
import { Assistant } from '../assistants/assistant.entity'; // <-- 1. BU SATIRI EKLE

@Module({
  imports: [
    // 2. AŞAĞIDAKİ LİSTEYE 'Assistant' EKLE
    TypeOrmModule.forFeature([Chat, Message, Assistant]) 
  ],
  controllers: [ChatsController],
  providers: [
    ChatsService, 
    ChatsGateway 
  ],
  exports: [ChatsService]
})
export class ChatsModule {}