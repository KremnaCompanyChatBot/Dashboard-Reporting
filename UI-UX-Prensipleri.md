# Proje Vizyonu ve Kullanıcı Hedefleri

## 1\. Görsel Tema: Dark Mode (Koyu Tema)

Ana Hedef: Kullanıcıların (Yöneticiler, Takım Liderleri) sisteme girdiklerinde "Hangi asistanım ne kadar başarılı? Hangi aksiyona ihtiyacım var?" sorularına hızlıca cevap bulabileceği, veri odaklı, minimal bir arayüz sunmak.

## Kullanıcı Profili

| Kullanıcı | Temel İhtiyaç |
| --- | --- |
| Yönetici | Genel KPI'ları görmek, anormallikleri tespit etmek ve hızlıca aksiyon almak. |
| Geliştirici | Hata takibi yapmak, bir asistanın konuşma geçmişini detaylıca incelemek. |

# 2\. Görsel Standartlar ve Tasarım Sistemi (UI)

Bu standartlar, uygulamanın genel görünümünü ve hissini belirler.

| Alan | Spesifikasyon | Gerekçe (Prensip) |
| --- | --- | --- |
| Tema | Koyu Tema (Dark Mode) | Göz yorgunluğunu azaltmak ve veri görselleştirmelerinin karanlık zemin üzerinde daha fazla öne çıkmasını sağlamak. |
| Tipografi | Google Font (Örn: Inter/Roboto) | Okunabilirliği yüksek, modern sans-serif font ailesi. |
| Renk Paleti | Birincil (Primary): Mavi/Turkuaz tonları. Vurgu (Accent): Sarı/Turuncu (Grafikler için). | Dark Mode'da kontrastı koruyarak profesyonel bir his vermek. |
| Boşluklar (Spacing) | 8'in katları (8px, 16px, 32px, 40px) | Tutarlı bir görsel ritim sağlamak. Büyük bölümler arası 40px dikey boşluk kullanılmalıdır. |
|  |  |  |

# 3\. Teslim Edilen Ekranlar ve Akışlar (UX/Wireframe Çıktıları)

Aşağıdaki ekranların Wireframe, Mockup ve Etkileşimli Prototip dosyaları ektedir.

## 3.1. Ana Dashboard (Anasayfa)

| Bileşen | Amaç ve Görselleştirme | Teslimat Durumu |
| --- | --- | --- |
| KPI Kartları | Sistemin genel durumu (Toplam Asistan, CTA Toplamları, Bilinmeyenler) gibi en kritik metrikleri büyük fontlar ile gösterir. | Mockup hazır. |
| Navigasyon | Sol Dikey Menü (Anasayfa, Analytics, Asistanlar). Seçili öğe güçlü bir vurgu ile belirtilmelidir. | Mockup & Prototip hazır. |
| Arama Çubuğu | Global arama (Asistanlar veya Konuşma geçmişi içinde) için Header bölümünde yer alır. | Mockup hazır. |

## 3.2. Analytics (Raporlama) Sayfası

| Bileşen | Amaç ve Görselleştirme | Teslimat Durumu |
| --- | --- | --- |
| Veri Görselleştirme | Pasta Grafiği (Landing Sayfası Etkileşimi gibi) | Mockup hazır. |
| Filtre Alanı | Verilerin Tarih Aralığı ve Asistan Adına göre filtrelenmesi için üst kısımda yer alacaktır. | Wireframe hazır. (Kodlanması önceliklidir.) |
| Metrik Kartları | Grafiğin altındaki özet veriler (Toplam Tıklama vb.) için kullanılır. | Mockup hazır. |

## 3.3. Asistanlar Sayfası

| Bileşen | Amaç ve Görselleştirme | Teslimat Durumu |
| --- | --- | --- |
| Asistan Kartları | Her bir asistan, tıklanabilir bir kart içinde gösterilir. Hover edildiğinde geri bildirim vermelidir. | Mockup hazır. |
| Yeni Oluşturma | Yeni asistan ekleme akışını başlatan bir buton bulunmalıdır. | Wireframe hazır. |
| Arama/Filtre | Sadece bu sayfadaki asistanları filtrelemek için ana arama çubuğu kullanılır. | Mockup hazır. |

# 4\. Kullanıcı Etkileşimleri (UX)

Geliştirme sırasında dikkat edilmesi gereken kritik etkileşimler:

\- Tıklanabilirlik Geri Bildirimi: Tıklanabilir tüm elemanlarda hover durumunda renk veya gölge değişimi olmalı.

\- Arama Etkileşimi: Arama çubuğuna odaklanıldığında çerçeve rengi birincil renge dönmeli ve placeholder kaybolmalı.

\- Navigasyon Akışı: Sol menüde tıklama sonrası sayfa geçişinde hafif animasyon olmalı.

\- Profil Menüsü: Sağ üstteki kullanıcı avatarına tıklandığında açılan menüde ikonlar bulunmalı.

  
