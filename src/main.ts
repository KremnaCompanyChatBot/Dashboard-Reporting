// backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 1. Frontend'deki '/api/v1/...' isteklerine cevap verebilmek için prefix ekliyoruz
  app.setGlobalPrefix('api/v1');

  // 2. React projesinin (farklı portta) erişebilmesi için CORS'u açıyoruz
  app.enableCors({
    origin: '*', // Güvenlik için prodüksiyonda frontend URL'i yazılır, şimdilik *
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  await app.listen(3000);
}
bootstrap();