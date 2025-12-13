import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS'u tam açıyoruz ki Widget ve Dashboard rahatça bağlansın
  app.enableCors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // API prefix eklemek iyi bir pratiktir (Dashboard kodlarında /api/v1 kullanılıyorsa buraya ekle)
  app.setGlobalPrefix('api/v1'); 

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Backend Çalışıyor: http://localhost:${port}`);
}
bootstrap();