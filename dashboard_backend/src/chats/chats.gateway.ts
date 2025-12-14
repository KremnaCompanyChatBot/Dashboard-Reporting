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
    origin: '*', 
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
    const chat = await this.chatsService.findOrCreateChat(data.assistantId);
    client.join(chat.id);
    client.emit('chat_started', chat);
  }

  @SubscribeMessage('send_message')
  async handleMessage(
    @MessageBody() data: { chatId: string; content: string },
  ) {
    // 1. KULLANICI MESAJINI KAYDET
    const userMsg = await this.chatsService.addMessage(data.chatId, 'user', data.content);
    
    // Mesajı Widget'a geri gönder (Ekranda görünsün)
    this.server.to(data.chatId).emit('new_message', userMsg);

    // 2. AI CEVABI ÜRET (Mistral Bağlantısı)
    // Servisteki generateAIResponse fonksiyonunu çağırıyoruz
    const aiResponseText = await this.chatsService.generateAIResponse(data.chatId, data.content);
    
    // AI cevabını veritabanına kaydet
    const aiMsg = await this.chatsService.addMessage(data.chatId, 'assistant', aiResponseText);
    
    // Cevabı Widget'a gönder
    this.server.to(data.chatId).emit('new_message', aiMsg);
  }
}