// src/components/AssistantCreateModal.jsx
import { useState } from "react";
import axios from "axios";
// Eğer Toast bileşenin yoksa veya hata veriyorsa aşağıdaki importu kaldırıp alert kullanabilirsin.
// import { useToast } from "./Toast"; 

export default function AssistantCreateModal({ open, onClose, onCreated }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Basit bir bildirim fonksiyonu (Toast bileşeni yoksa hata vermemesi için)
  const showToast = (message, type) => {
    // Eğer projende Toast yapısı varsa onu kullan, yoksa alert göster
    // console.log(`${type}: ${message}`);
    // alert(message);
  };

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: name,
        description: "Dashboard üzerinden oluşturuldu",
        model: "mistral",
        instructions: "Sen yardımcı bir asistansın."
      };

      const res = await axios.post(
        "http://localhost:3000/api/v1/assistants",
        payload
      );

      onCreated(res.data); // Listeyi güncelle
      showToast("Asistan oluşturuldu!", "success");
      onClose();
      setName("");
    } catch (err) {
      console.error(err);
      alert("Hata oluştu: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-xl border border-gray-200">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Yeni Asistan</h2>
        <form onSubmit={submit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Asistan Adı</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Örn: Müşteri Temsilcisi"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              İptal
            </button>
            <button
              disabled={loading}
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? "Kaydediliyor..." : "Oluştur"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}