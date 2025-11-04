# nest_dashboard_api


NestJS starter project with TypeORM configuration for PostgreSQL and in-memory mock data.

## Setup (local PostgreSQL)

1. Node.js (>=16) kurulu olduğundan emin ol.
2. Repo'yu aç:
   ```bash
   cd nest_dashboard_api
   npm install
   ```
3. `.env` dosyasını oluştur (örnek `.env.example` var).
4. Geliştirme için:
   ```bash
   npm run start:dev
   ```
5. Prod için:
   ```bash
   npm run build
   npm start
   ```
5. Postman Collection Dosyası(Tüm Endpointleri içerir): 
   https://drive.google.com/file/d/1jLBlk9U1prXeUCivbZGX0xNSfBom91Uo/view?usp=sharing


## Gelecekte veritabanına geçiş
- `src/config/typeorm.config.ts` içinde TypeORM config hazır.
- `src/items/item.entity.ts` entity tanımlı.
- `ItemsService` şimdilik in-memory kullanıyor; TypeORM repository ile değiştirmek kolaydır (örnekte yorum satırı gösteriliyor).
