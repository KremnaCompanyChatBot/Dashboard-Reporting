// public/embed.js
(function () {
  // Kullanıcının sayfaya koyduğu global değişkenden ID'yi al
  const assistantId = window.KREMNA_ASSISTANT_ID;
  
  if (!assistantId) {
    console.error("Kremna Widget: Asistan ID bulunamadı!");
    return;
  }

  const iframe = document.createElement("iframe");
  
  // ÖNEMLİ NOKTA: ID'yi query string olarak ekliyoruz (?assistantId=...)
  // Widget projesindeki App.jsx bunu okuyacak.
  iframe.src = `http://localhost:5173/?assistantId=${assistantId}`;
  
  // Iframe Stilleri
  iframe.style.position = "fixed";
  iframe.style.bottom = "0";
  iframe.style.right = "0";
  iframe.style.width = "400px";
  iframe.style.height = "600px";
  iframe.style.border = "none";
  iframe.style.zIndex = "999999";
  iframe.style.pointerEvents = "none"; // Kapalıyken siteyi engellemesin
  iframe.style.background = "transparent";

  // Widget açılıp kapanınca boyut değiştir
  window.addEventListener("message", (event) => {
    if (event.data.type === "KREMNA_WIDGET_RESIZE") {
      if (event.data.isOpen) {
        iframe.style.height = "600px";
        iframe.style.width = "400px";
        iframe.style.pointerEvents = "all";
      } else {
        iframe.style.height = "100px";
        iframe.style.width = "100px";
        iframe.style.pointerEvents = "all";
      }
    }
  });

  document.body.appendChild(iframe);
})();