**Tasarım Geliştirmeleri**

**Asistanlar Yönetim Alanı**

**Hedef:** Yöneticilerin tüm asistanları tek bir yerden görüntülemesini
ve yönetmesini sağlamak.

-   **Toplam Asistan Sayısı Gösterimi:** \"Toplam Asistan\" başlığı
    > altında, sistemdeki **mevcut asistan sayısının net bir şekilde
    > gösterilmesi**. Bu, yöneticinin genel durumu hızla anlamasını
    > sağlar.

    > **Asistan Kartları:** Her bir asistanın aşağıdaki temel bilgileri
    > içeren bir kart formatında sunulması:

    -   -   -   -   -   **Asistan Adı:** Kullanıcının verdiği isim.

                    -   **Asistan ID (İşlevsel Kimlik):** Benzersiz bir
                        > tanımlayıcı.

                    -   **İşlem Butonları:** Kart üzerinde, asistanı
                        > **Silme** veya **Düzenleme** gibi eylemler
                        > için ikon veya butonların bulunması 3.2. Yeni
                        > Asistan Ekleme İşlevi

**Hedef:** Sezgisel ve minimum adımla yeni bir asistan oluşturma süreci
sağlamak.

-   **Buton Konumu ve Tasarımı:** Listeleme alanının sağ üst köşesinde,
    > dikkat çekici ve kolay erişilebilir bir **\"+ Yeni Asistan\"**
    > butonu (Primary Button) konumlandırılmalıdır.

    > **Modal/Pop-up Arayüzü:** Butona tıklandığında, kullanıcının ana
    > sayfadan ayrılmadan işlem yapmasını sağlayacak bir **\"Yeni
    > Asistan Oluştur\"** modal penceresi açılmalıdır.

    > **Gerekli Giriş Alanları:**

    -   -   -   -   -   **Asistan Adı:** Kısa ve açıklayıcı bir isim.
                        > Bir placeholder ile örnek format
                        > gösterilmelidir.

                    -   **Asistan ID:** Asistanın benzersiz API veya
                        > işleyici kimliği. Bir placeholder ile örnek
                        > format gösterilmelidir.

```{=html}
<!-- -->
```
-   **İşlem Butonları:** Modal pencerede **\"Oluştur\"** ve
    > **\"İptal\"** butonları bulunmalıdır.

**Asistan Silme İşlevi**

**Hedef:** Yanlışlıkla silmeleri önlemek için bir onay mekanizması
eklemek.

-   **Onay İletişim Kutusu:** Kullanıcı silme ikonuna tıkladığında,
    > eylemi onaylamak için bir **Onay Kutusu** gösterilmelidir.

    -   -   -   -   -   **Uyarı Metni:** Silme işleminin geri alınamaz
                        > olduğunu belirten net bir soru (\"Bu asistanı
                        > silmek istediğinizden emin misiniz?").

                    -   **Seçenekler:** **\"Evet/Sil\"** ve
                        > **\"İptal\"** seçenekleri sunulmalıdır.

**Bildirim ve Geri Bildirim Mekanizması**

**Hedef:** Kullanıcıyı işlemlerin sonuçları hakkında anında
bilgilendirmek.

-   **Başarı Bildirimleri :** İşlem başarıyla tamamlandığında ekranın
    > sağ üst köşesinde kısa süreli, pozitif renkli bir bildirim
    > gösterilmelidir.

    > **Hata Bildirimleri:** Eğer bir işlem başarısız olursa (Örn: ID
    > zaten kullanımda), ilgili alana yakın veya genel bir hata
    > bildirimi gösterilmelidir.

> **Figma**
>
> https://www.figma.com/design/uNHOe3EJSz9MGg6tJOwGon/Untitled?node-id=0-1&m=dev&t=b4NHdu1ZKCgTwU5V-1
