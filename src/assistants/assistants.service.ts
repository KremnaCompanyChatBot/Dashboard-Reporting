import { Injectable } from '@nestjs/common';


export interface Assistant {
  assistantId: string;
  name: string;
}

@Injectable()
export class AssistantsService {
  private assistants: Assistant[] = [
    { assistantId: 'a1', name: 'AI Tarihçi' },
    { assistantId: 'a2', name: 'AI Matematikçi' },
    { assistantId: 'a3', name: 'AI Danışman' },
  ];

  getAll(): Assistant[] {
    return this.assistants;
  }

  create(assistant: Assistant) {
    this.assistants.push(assistant);
    return assistant;
  }

  update(assistantId: string, name: string) {
    const assistant = this.assistants.find(a => a.assistantId === assistantId);
    if (!assistant) return null;
    assistant.name = name;
    return assistant;
  }

  remove(assistantId: string) {
    const index = this.assistants.findIndex(a => a.assistantId === assistantId);
    if (index === -1) return null;
    return this.assistants.splice(index, 1)[0];
  }
}
