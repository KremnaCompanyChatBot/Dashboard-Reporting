import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ChatsService {
  private data: any;

  constructor() {
    const p = path.resolve(process.cwd(), 'mock-data.json');
    this.data = JSON.parse(fs.readFileSync(p, 'utf8'));
  }

  findByAssistant(assistantId: string, userId?: string) {
    const chat = this.data.chats?.find(c => c.assistantId === assistantId && (userId ? c.userId === userId : true));
    if (chat) return chat;
    return { assistantId, userId, messages: [] };
  }

  findAll() {
    return this.data.chats || [];
  }
}
