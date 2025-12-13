// src/chats/chats.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatsService } from './chats.service';

@WebSocketGateway({
  cors: {
    origin: '*', // Tüm sitelerden erişime izin ver (CORS)
  },
})
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatsService: ChatsService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('start_chat')
  async handleStartChat(
    @MessageBody() data: { assistantId: string },
    @ConnectedSocket() client: Socket,
  ) {
    // Burada userId opsiyonel, anonim chat başlatıyoruz
    const chat = await this.chatsService.findOrCreateChat(data.assistantId);
    client.join(chat.id);
    client.emit('chat_started', chat);
    return chat;
  }

  @SubscribeMessage('send_message')
  async handleMessage(
    @MessageBody() data: { chatId: string; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    // 1. Kullanıcı mesajını kaydet
    const userMsg = await this.chatsService.addMessage(data.chatId, 'user', data.content);
    
    // Mesajı odadaki (room) herkese gönder
    this.server.to(data.chatId).emit('new_message', userMsg);

    // --- SQUAD 5 (AI) SİMÜLASYONU ---
    // Gerçek AI bağlanana kadar "Echo" yapan basit bir cevap üretici
    setTimeout(async () => {
      const aiResponse = `Echo: ${data.content}`;
      const aiMsg = await this.chatsService.addMessage(data.chatId, 'assistant', aiResponse);
      this.server.to(data.chatId).emit('new_message', aiMsg);
    }, 1000);
  }
}