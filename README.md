Aşağıda **tek parça**, **kesintisiz** ve **tek seferde kopyalanabilir** şekilde hazırlanmış `README.md` içeriğini veriyorum.
Hiçbir yerde blok bozulması yoktur; tamamını seçip doğrudan `dashboard_backend/README.md` içine yapıştırabilirsin.

````markdown
# Kremna AI - Dashboard Backend API

Bu proje, Kremna AI Dashboard ve Widget uygulamaları için geliştirilmiş RESTful API ve WebSocket sunucusudur.  
NestJS, TypeORM ve PostgreSQL altyapısını kullanır.

## 🚀 Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin.

### 1. Gereksinimler
- Node.js (v16 veya üzeri)
- PostgreSQL Veritabanı

### 2. Kurulum

Bağımlılıkları yükleyin:

```bash
npm install
````

### 3. Çevre Değişkenleri (.env)

Ana dizinde bir `.env` dosyası oluşturun ve aşağıdaki ayarları kendi veritabanınıza göre düzenleyin:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=nest_dashboard_db
PORT=3000
JWT_SECRET=gizli_anahtar_buraya
MISTRAL_API_KEY=mistral_api_key_buraya
GEMINI_API_KEY=gemini_api_key_buraya
```

### 4. Başlatma

Geliştirme modunda başlatmak için:

```bash
npm run start:dev
```

API varsayılan olarak `http://localhost:3000/api/v1` adresinde çalışır.

---

## 📡 API Endpoint Dokümantasyonu

Tüm HTTP istekleri `/api/v1` öneki ile yapılmalıdır.

### 🔐 1. Kimlik Doğrulama (Auth)

Kullanıcı kaydı ve girişi için kullanılır.
Token gerektirmez.

| Metot | Endpoint         | Açıklama                        | Body (JSON)                                                           |
| ----- | ---------------- | ------------------------------- | --------------------------------------------------------------------- |
| POST  | `/auth/register` | Yeni kullanıcı kaydı oluşturur  | `{ "username": "user", "email": "test@mail.com", "password": "123" }` |
| POST  | `/auth/login`    | Giriş yapar, access_token döner | `{ "email": "test@mail.com", "password": "123" }`                     |

---

### 🤖 2. Asistan Yönetimi (Assistants)

Kullanıcıya ait asistanları yönetir.
**Header:** `Authorization: Bearer <TOKEN>`

| Metot  | Endpoint          | Açıklama                                | Body (JSON)                                                                            |
| ------ | ----------------- | --------------------------------------- | -------------------------------------------------------------------------------------- |
| GET    | `/assistants`     | Kullanıcının tüm asistanlarını listeler | -                                                                                      |
| GET    | `/assistants/:id` | Tek bir asistanın detaylarını getirir   | -                                                                                      |
| POST   | `/assistants`     | Yeni asistan oluşturur                  | `{ "name": "Satış Botu", "instructions": "Sen bir satıcısın...", "model": "mistral" }` |
| PATCH  | `/assistants/:id` | Asistan bilgilerini günceller           | `{ "name": "Yeni İsim", "instructions": "Yeni talimat..." }`                           |
| DELETE | `/assistants/:id` | Asistanı siler                          | -                                                                                      |

---

### 💬 3. Sohbet Geçmişi (Chats)

Asistanlarla yapılan konuşmaları yönetir.
**Header:** `Authorization: Bearer <TOKEN>`

| Metot  | Endpoint                        | Açıklama                                   |
| ------ | ------------------------------- | ------------------------------------------ |
| GET    | `/chats`                        | Tüm sohbet geçmişini (özet) getirir        |
| GET    | `/chats/assistant/:assistantId` | Belirli asistanın tüm sohbetlerini getirir |
| GET    | `/chats/:id`                    | Tek bir sohbetin mesaj detaylarını getirir |
| DELETE | `/chats/:id`                    | Sohbeti ve mesajlarını siler               |

---

### 📊 4. Analitik ve Raporlar (Analytics)

Dashboard grafik verileri.
**Header:** `Authorization: Bearer <TOKEN>`

| Metot | Endpoint     | Açıklama                                                |
| ----- | ------------ | ------------------------------------------------------- |
| GET   | `/analytics` | Toplam mesaj, asistan sayısı ve grafik verilerini döner |

---

## 🔌 WebSocket (Widget Bağlantısı)

Widget ile canlı iletişim için kullanılır.
Socket.io altyapısı mevcuttur.

* **Sunucu URL:** `ws://localhost:3000`
* **Namespace:** `/`

### İstemci → Sunucu Eventleri

#### `start_chat`

Widget açıldığında sohbeti başlatır veya mevcut sohbete bağlanır.

```json
{
  "assistantId": "UUID"
}
```

#### `send_message`

Kullanıcı mesaj gönderdiğinde tetiklenir.

```json
{
  "chatId": "UUID",
  "content": "Merhaba"
}
```

---

### Sunucu → İstemci Eventleri

#### `chat_started`

Sohbet başarıyla başladığında döner.

#### `new_message`

Hem kullanıcı mesajı hem AI cevabı bu event ile gelir.

```json
{
  "role": "user | assistant",
  "content": "...",
  "createdAt": "..."
}
```

---

## 📂 Proje Yapısı

* `src/auth` → Login / Register ve JWT stratejisi
* `src/users` → Kullanıcı veritabanı işlemleri
* `src/assistants` → Asistan CRUD işlemleri
* `src/chats` → Mesajlaşma mantığı ve WebSocket Gateway
* `src/analytics` → Analitik ve raporlama sorguları

```

İstersen bir sonraki adımda:
- Widget tarafı için **ayrı README**
- Swagger / OpenAPI dokümantasyonu
- Production `.env.example`
- Docker + docker-compose dokümantasyonu

hazırlayabilirim.
```
