// src/components/AssistantCreateModal.jsx
import { useState } from "react";
import axios from "axios";
import { useToast } from "./Toast";

export default function AssistantCreateModal({ open, onClose, onCreated }) {
  const [name, setName] = useState("");
  const [assistantId, setAssistantId] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name,
      assistantId: assistantId || undefined,
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL || "http://localhost:3000"}/api/v1/assistants`,
        payload
      );

      onCreated(res.data);
      showToast("Asistan başarıyla oluşturuldu ✅", "success");
      onClose();
    } catch (err) {
      console.warn("⚠️ Backend kapalı, mock moda geçiliyor.");
      showToast("Backend'e bağlanamadı, mock olarak eklendi", "warning");

      onCreated({
        name,
        assistantId: assistantId || `local_${Date.now()}`,
      });

      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-md p-6 shadow-xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Yeni Asistan Oluştur</h2>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">Asistan Adı *</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-md border dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
              placeholder="Örn: AI Tarihçi"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">Asistan ID (opsiyonel)</label>
            <input
              value={assistantId}
              onChange={(e) => setAssistantId(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-md border dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
              placeholder="örn: a5"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800"
            >
              İptal
            </button>
            <button
              disabled={loading}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Gönderiliyor..." : "Oluştur"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
