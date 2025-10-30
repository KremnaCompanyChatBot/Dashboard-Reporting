import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';
import { typeOrmConfig } from './config/typeorm.config';
import { ChatsModule } from './chats/chats.module';
import { AssistantsModule } from './assistants/assistants.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ItemsModule,
    ChatsModule,
    AssistantsModule,
    AnalyticsModule
  ],
})
export class AppModule {}
