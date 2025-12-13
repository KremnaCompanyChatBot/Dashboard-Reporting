import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { ChatsGateway } from './chats.gateway'; // Birazdan oluşturacağız
import { Chat } from './chat.entity';     // Entity dosyanın olduğu yol
import { Message } from './message.entity'; // Entity dosyanın olduğu yol

@Module({
  imports: [
    // Veritabanı tablolarını modüle tanıtıyoruz
    TypeOrmModule.forFeature([Chat, Message]) 
  ],
  controllers: [ChatsController],
  providers: [
    ChatsService, 
    ChatsGateway // WebSocket kapısını açıyoruz
  ],
  exports: [ChatsService] // Diğer modüller (örn: AI) kullanabilsin
})
export class ChatsModule {}