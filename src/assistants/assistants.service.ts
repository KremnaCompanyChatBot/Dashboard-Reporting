import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assistant } from './assistant.entity';

@Injectable()
export class AssistantsService {
  constructor(
    @InjectRepository(Assistant)
    private assistantRepo: Repository<Assistant>,
  ) {}

  // Tüm asistanları getir
  async findAll() {
    return await this.assistantRepo.find();
  }

  // ID'ye göre tek bir asistan getir
  async findOne(id: string) {
    const assistant = await this.assistantRepo.findOne({ where: { id } });
    if (!assistant) {
      throw new NotFoundException(`Assistant with ID ${id} not found`);
    }
    return assistant;
  }

  // Yeni asistan oluştur
  async create(data: Partial<Assistant>) {
    const newAssistant = this.assistantRepo.create(data);
    return await this.assistantRepo.save(newAssistant);
  }

  // Asistan güncelle
  async update(id: string, attrs: Partial<Assistant>) {
    const assistant = await this.findOne(id);
    Object.assign(assistant, attrs);
    return await this.assistantRepo.save(assistant);
  }

  // Asistan sil
  async remove(id: string) {
    const assistant = await this.findOne(id);
    return await this.assistantRepo.remove(assistant);
  }
}