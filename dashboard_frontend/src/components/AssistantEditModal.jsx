import { useState, useEffect } from "react";
import axios from "axios";
import { X } from "lucide-react";

export default function AssistantEditModal({ open, onClose, assistant, onUpdated }) {
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(false);

  // Modal açıldığında mevcut bilgileri doldur
  useEffect(() => {
    if (assistant) {
      setName(assistant.name);
      setInstructions(assistant.instructions || "");
    }
  }, [assistant]);

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Güncelleme isteği (PATCH)
      const res = await axios.patch(
        `http://localhost:3000/api/v1/assistants/${assistant.id}`,
        { name, instructions }
      );

      onUpdated(res.data); // Listeyi güncelle
      onClose(); // Kapat
      alert("Asistan güncellendi!");
    } catch (err) {
      console.error(err);
      alert("Güncelleme başarısız.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[500px] shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4 text-gray-800">Asistanı Düzenle</h2>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Asistan Adı</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Öncelikli Talimat (System Prompt)
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Asistanın nasıl davranacağını değiştir. (Örn: "Sen artık bir İngilizce öğretmenisin")
            </p>
            <textarea
              required
              rows={6}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none font-mono text-sm"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              İptal
            </button>
            <button
              disabled={loading}
              className="px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Kaydediliyor..." : "Kaydet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}