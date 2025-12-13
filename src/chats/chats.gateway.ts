import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatsService } from './chats.service';

@WebSocketGateway({ cors: { origin: '*' } }) // Tüm sitelerden (Widget) erişime izin ver
export class ChatsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatsService: ChatsService) {}

  @SubscribeMessage('start_chat')
  async handleStartChat(
    @MessageBody() data: { assistantId: string },
    @ConnectedSocket() client: Socket,
  ) {
    // Widget "Ben geldim, asistan ID'm bu" diyor
    const chat = await this.chatsService.findOrCreateChat(data.assistantId);
    client.join(chat.id); // Kullanıcıyı özel odaya al
    client.emit('chat_started', chat); // Cevap dön
  }

  @SubscribeMessage('send_message')
  async handleMessage(
    @MessageBody() data: { chatId: string; content: string },
  ) {
    // 1. Kullanıcı mesajını kaydet
    const userMsg = await this.chatsService.addMessage(data.chatId, 'user', data.content);
    
    // Mesajı odaya (Widget'a) geri gönder ki ekranda görünsün
    this.server.to(data.chatId).emit('new_message', userMsg);

    // 2. AI Cevabı (Squad 5 buraya bağlanacak) - Şimdilik Simülasyon
    setTimeout(async () => {
      const aiResponse = await this.chatsService.addMessage(
        data.chatId, 
        'assistant', 
        `Echo: ${data.content}`
      );
      this.server.to(data.chatId).emit('new_message', aiResponse);
    }, 1000);
  }
}