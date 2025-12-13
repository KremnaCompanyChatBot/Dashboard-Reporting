// src/chats/chats.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { Chat } from './chat.entity';
import { Message } from './message.entity';
import { ChatsGateway } from './chats.gateway';
import { AssistantsModule } from '../assistants/assistants.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat, Message]),
    AssistantsModule
  ],
  controllers: [ChatsController],
  providers: [ChatsService, ChatsGateway], 
})
export class ChatsModule {}