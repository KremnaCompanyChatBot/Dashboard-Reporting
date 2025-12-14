// src/pages/AssistantsPage.jsx
import { useState } from "react";
import { Plus } from "lucide-react";
import AssistantList from "../components/AssistantList";
import AssistantCreateModal from "../components/AssistantCreateModal";

function AssistantsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Listeyi yenilemek için basit bir tetikleyici (key değişince bileşen yenilenir)
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      {/* ÜST BAŞLIK VE BUTON ALANI */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Asistan Yönetimi</h1>
          <p className="text-sm text-gray-500 mt-1">Chatbotlarını buradan yönetebilirsin.</p>
        </div>
        
        {/* BUTON BURADA */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-sm"
        >
          <Plus size={18} /> Yeni Asistan Oluştur
        </button>
      </div>

      {/* LİSTE BİLEŞENİ */}
      {/* key={refreshKey} sayesinde her yeni eklemede liste kendini yeniler */}
      <AssistantList key={refreshKey} />

      {/* MODAL (GİZLİ PENCERE) */}
      <AssistantCreateModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={() => {
          // Asistan oluşturulduğunda bu fonksiyon çalışır ve listeyi yeniler
          setRefreshKey(prev => prev + 1);
        }}
      />
    </div>
  );
}

export default AssistantsPage;