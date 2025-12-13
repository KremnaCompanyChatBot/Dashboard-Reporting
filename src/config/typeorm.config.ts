// src/config/typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Not: AppModule içinde ConfigModule.forRoot() eklenecek.
export const typeOrmConfigAsync: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '123',
  database: process.env.DB_DATABASE || 'dashboard_db',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true, // Geliştirme aşamasında tabloları otomatik oluşturur (Prod'da false olmalı)
};