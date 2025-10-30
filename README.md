# 🤖 Chatbot Dashboard Frontend

Bu proje, **Yüksek Trafikli Sistemlerde Chatbot Geliştirme** dersi kapsamında geliştirilen chatbot yönetim panelinin frontend kısmıdır.  
Proje 6 kişilik bir ekip tarafından yürütülmüş olup, **benim sorumluluğum frontend (ReactJS + TailwindCSS)** kısmıdır.

---

## 🚀 Özellikler

✅ **Asistan Listeleme (AssistantList)**  
- Backend açıkken `/api/v1/assistants` endpoint'inden veri çeker  
- Backend kapalıysa `mock-data.json`'dan veri kullanır  
- Gerçek zamanlı arama (Navbar ile entegre `SearchContext`)  
- Responsive, kart tabanlı UI  
- Dark / Light tema desteği  
- Hover animasyonları ve dinamik kaynak etiketi (Backend / Local Mock)

✅ **Analytics Panel (AnalyticsPanel)**  
- `/api/v1/analytics/records` endpoint’inden verileri çeker  
- `Recharts` kütüphanesiyle pie chart gösterimi  
- Toplam CTA tıklamaları ve en çok tıklanan buton kutucukları  
- Backend veya Mock modunda otomatik çalışır

✅ **Dashboard Yapısı**  
- Sidebar (navigasyon):  
  - 🏠 Anasayfa  
  - 📊 Analytics  
  - 🤖 Asistanlar  
  - 🌙 Tema değiştirme butonu  
- Navbar:  
  - 🔍 Arama kutusu (global filtreleme)  
  - 🔔 Bildirim menüsü (okundu yap)  
  - 👤 Profil menüsü (Profilim, Ayarlar, Çıkış Yap)  
- Tam responsive ve Tailwind ile temalı

✅ **Dark / Light Tema Yönetimi**  
- `ThemeContext` ile global tema yönetimi  
- Kullanıcı tercihi `localStorage`’da saklanır  

✅ **Anasayfa (Home)**  
- Backend’den dinamik istatistik çekimi  
  - Toplam Asistan sayısı  
  - Toplam CTA tıklaması  
- Kaynak göstergesi: Backend veya Local Mock  
- Hızlı yönlendirme butonları  

---

## 🧠 Kullanılan Teknolojiler

| Teknoloji | Açıklama |
|------------|-----------|
| ReactJS | Frontend kütüphanesi |
| TailwindCSS | Hızlı ve modern stil sistemi |
| Axios | API istekleri |
| Recharts | Görsel grafikler |
| Lucide-React | Modern ikon kütüphanesi |
| React Router DOM | Sayfa yönlendirmeleri |
| Context API | Tema ve arama durumu yönetimi |

---

## ⚙️ Kurulum

Projeyi yerel ortamına almak için:

```bash
# 1. Depoyu klonla
git clone https://github.com/azirmi/dashboard_frontend.git

# 2. Klasöre gir
cd dashboard_frontend

# 3. Gerekli bağımlılıkları yükle
npm install

# 4. Projeyi başlat
npm start
