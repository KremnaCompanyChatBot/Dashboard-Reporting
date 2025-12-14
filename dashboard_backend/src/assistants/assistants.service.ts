import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assistant } from './assistant.entity';

@Injectable()
export class AssistantsService {
  constructor(
    @InjectRepository(Assistant)
    private assistantRepo: Repository<Assistant>,
  ) {}

  // Sadece o kullanıcının asistanlarını getir
  async findAll(userId: string) {
    return await this.assistantRepo.find({ where: { userId } });
  }

  // Oluştururken userId'yi de kaydet
  async create(data: Partial<Assistant>, userId: string) {
    const newAssistant = this.assistantRepo.create({ ...data, userId });
    return await this.assistantRepo.save(newAssistant);
  }

  // Tekil getirmede de güvenlik kontrolü yapabilirsin (Opsiyonel ama iyi olur)
  async findOne(id: string) {
    return await this.assistantRepo.findOne({ where: { id }, relations: ['user'] });
  }
  
  // Güncelleme ve silme için de userId kontrolü eklenebilir
  async delete(id: string) {
    return await this.assistantRepo.delete(id);
  }
  
  async update(id: string, attrs: Partial<Assistant>) {
    const assistant = await this.findOne(id);
    if (!assistant) {
      throw new Error('Asistan bulunamadı');
    }
    Object.assign(assistant, attrs);
    return this.assistantRepo.save(assistant);
  }
}