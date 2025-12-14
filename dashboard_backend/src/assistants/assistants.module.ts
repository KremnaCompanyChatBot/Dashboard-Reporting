// src/assistants/assistants.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssistantsService } from './assistants.service';
import { AssistantsController } from './assistants.controller';
import { Assistant } from './assistant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Assistant])], // Entity'yi burada tanıtıyoruz
  controllers: [AssistantsController],
  providers: [AssistantsService],
  exports: [AssistantsService], // Diğer modüller (Chats) kullanabilsin diye export ediyoruz
})
export class AssistantsModule {}