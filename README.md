# Kremna Chatbot Dashboard & Reporting


## 🎯 Amaç
Bu proje, **Kremna Chatbot** sisteminin etkileşim, performans ve kullanıcı verilerini izlemek, analiz etmek ve raporlamak amacıyla geliştirilmiştir.  
Amaç; chatbot operasyonlarının durumunu görünür kılmak, kullanıcı davranışlarını anlamlandırmak ve veri odaklı karar desteği sağlamaktır.

---

## 🧩 Genel Bakış
**Kremna Chatbot Dashboard & Reporting**, chatbot sistemlerinden gelen verileri toplayan, işleyen ve görselleştiren bir web panelidir.  
Backend katmanı NestJS tabanlıdır, Frontend katmanı React ve TypeScript ile geliştirilmiştir.  
Gerçek zamanlı (realtime) altyapı farklı bir takım tarafından yönetilmekte olup bu proje kapsamı dışındadır.

---

## 🏗️ Mimari

| Katman | Teknoloji | Açıklama |
|--------|------------|----------|
| **Backend** | NestJS (TypeScript) | REST API, veri erişim katmanı, servis yapısı |
| **Frontend** | React + TypeScript | Dashboard arayüzü, kullanıcı etkileşimi |
| **Database** | PostgreSQL | Veritabanı |
| **Auth** | JWT | Kimlik doğrulama |
| **Containerization** | Docker & docker-compose | Ortam bağımsız çalışma |

---

## ⚙️ Özellikler
- Chatbot konuşma sayıları ve dağılımları  
- Kanal bazlı performans (Web, WhatsApp, Telegram vb.)  
- Niyet (Intent) analizi ve fallback oranları  
- Kullanıcı davranış analitiği  
- Dashboard widget sistemi (grafikler, tablolar, KPI kartları)  
- Rapor dışa aktarma (Excel, PDF)  
- Rol bazlı erişim (Admin, Analyst, Operator)  
- Modern ve responsive kullanıcı arayüzü  

---

## 🚀 Kurulum

### Gereksinimler
- [Node.js 18+](https://nodejs.org)
- PostgreSQL (lokal veya container)

### Adımlar

#### 
```bash
1. Reponun klonlanması
git clone https://github.com/KremnaCompanyChatBot/Dashboard-Reporting.git
cd Dashboard-Reporting
git checkout release/KREM-229

2. Backend kurulumu
cd backend
npm install
npm run start:dev

3. Frontend kurulumu
cd ../frontend
npm install
npm start

🐳 Docker ile çalıştırma

Tüm servisi container ortamında ayağa kaldırmak için:

docker-compose up --build

Servis	Port	Açıklama
Frontend	3000	React dashboard
Backend	4000	NestJS API
PostgreSQL	5432	Veritabanı

🔧 Yapılandırma
Backend .env
DATABASE_URL=postgresql://user:password@localhost:5432/dashboard
JWT_SECRET=your-jwt-secret
NODE_ENV=development
PORT=4000

Frontend .env
REACT_APP_API_URL=http://localhost:4000
REACT_APP_ENV=development


🧪 Test & CI/CD
Testler

Backend: Nest.js

Frontend: React.js 

Test komutu:

npm run test

CI/CD

GitHub Actions pipeline:

Test
Build & Dockerize
Deploy (manuel onay ile)

📊 Raporlama Modülleri

Overview Dashboard: Genel metrikler (aktif kullanıcı, mesaj hacmi, ortalama yanıt süresi)
User Insights: Kullanıcı aktivite trendleri
Channel Reports: Kanal bazlı etkileşim raporları


👨‍💻 Katkı Rehberi

Yeni özellik için dal oluştur:

git checkout -b feature/<özellik-adı>

Testleri çalıştır:

npm run test
PR açıklamasında değişiklik amacını açıkla.
Kod gözden geçirme (review) sonrası merge yapılır.

🪪 Lisans

Bu proje Kremna Company’ye aittir.
Tüm hakları saklıdır.

📫 İletişim

Project Management: suaybdemir1@gmail.com

Not: Gerçek zamanlı (Realtime) mesajlaşma ve olay yayınlama altyapısı bu repo kapsamı dışındadır.
Bu repository yalnızca dashboard ve raporlama fonksiyonlarını içerir.
