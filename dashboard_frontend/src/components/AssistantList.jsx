// src/components/AssistantList.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Edit, Copy, Check, Code, X, Clipboard, MessageSquare } from "lucide-react"; 
import AssistantEditModal from "./AssistantEditModal";
import ChatHistoryModal from "./ChatHistoryModal"; // <-- YENİ IMPORT

export default function AssistantList() {
  const [assistants, setAssistants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const [scriptCopied, setScriptCopied] = useState(false);

  // Modallar için State'ler
  const [showScriptModal, setShowScriptModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  // YENİ: Sohbet Geçmişi Modalı için State
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  
  const [selectedAssistant, setSelectedAssistant] = useState(null);

  const fetchAssistants = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/assistants");
      setAssistants(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Hata:", err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Silmek istediğine emin misin?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/v1/assistants/${id}`);
      setAssistants(assistants.filter((a) => a.id !== id));
    } catch (err) {
      alert("Silinemedi.");
    }
  };

  const handleCopyId = (id) => {
    navigator.clipboard.writeText(id).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleCopyScript = () => {
    const scriptCode = `<script>
  window.KREMNA_ASSISTANT_ID = "${selectedAssistant.id}";
</script>
<script src="http://localhost:5173/embed.js" async></script>`;
    navigator.clipboard.writeText(scriptCode).then(() => {
      setScriptCopied(true);
      setTimeout(() => setScriptCopied(false), 2000);
    });
  };

  const openScriptModal = (assistant) => {
    setSelectedAssistant(assistant);
    setShowScriptModal(true);
    setScriptCopied(false);
  };

  const openEditModal = (assistant) => {
    setSelectedAssistant(assistant);
    setShowEditModal(true);
  };

  // YENİ: Geçmiş Modalını Aç
  const openHistoryModal = (assistant) => {
    setSelectedAssistant(assistant);
    setShowHistoryModal(true);
  };

  useEffect(() => { fetchAssistants(); }, []);

  if (loading) return <div className="p-4 text-center">Yükleniyor...</div>;

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {assistants.map((assistant) => (
          <div key={assistant.id} className="bg-white p-6 rounded-lg shadow border border-gray-200 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-800">{assistant.name}</h3>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded border">
                {assistant.model}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[40px]">
              {assistant.description || "Açıklama yok."}
            </p>
            
            <div className="flex gap-2 border-t pt-4">
              {/* DÜZENLEME */}
              <button onClick={() => openEditModal(assistant)} className="bg-gray-50 text-gray-600 p-2 rounded hover:bg-gray-100" title="Düzenle">
                <Edit size={18} />
              </button>
              
              {/* YENİ: GEÇMİŞİ GÖR */}
              <button 
                onClick={() => openHistoryModal(assistant)}
                className="bg-orange-50 text-orange-600 p-2 rounded hover:bg-orange-100 flex items-center justify-center"
                title="Konuşma Geçmişi"
              >
                <MessageSquare size={18} />
              </button>

              {/* SCRIPT KODU */}
              <button onClick={() => openScriptModal(assistant)} className="bg-purple-50 text-purple-600 p-2 rounded hover:bg-purple-100 flex items-center justify-center" title="Siteye Ekle">
                <Code size={18} />
              </button>


              {/* SİLME */}
              <button onClick={() => handleDelete(assistant.id)} className="bg-red-50 text-red-600 p-2 rounded hover:bg-red-100">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODALLAR */}
      
      {/* 1. SCRIPT MODAL */}
      {showScriptModal && selectedAssistant && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[600px] shadow-2xl relative">
             <button onClick={() => setShowScriptModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={24} /></button>
             <h3 className="text-xl font-bold mb-2">Web Sitenize Ekleyin</h3>
             <p className="text-sm text-gray-500 mb-4">Bu kodu sitenizin <code>&lt;body&gt;</code> etiketinin sonuna ekleyin.</p>
             <div className="relative">
               <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-xs overflow-x-auto my-4 border border-gray-700">
                  <pre>{`<script>
  window.KREMNA_ASSISTANT_ID = "${selectedAssistant.id}";
</script>
<script src="http://localhost:5173/embed.js" async></script>`}</pre>
               </div>
               <button onClick={handleCopyScript} className={`absolute top-2 right-2 px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1 transition-all ${scriptCopied ? "bg-green-600 text-white" : "bg-white/10 text-white hover:bg-white/20 border border-white/20"}`}>
                 {scriptCopied ? <><Check size={14}/> Kopyalandı</> : <><Clipboard size={14}/> Kopyala</>}
               </button>
             </div>
             <div className="flex justify-end"><button onClick={() => setShowScriptModal(false)} className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200">Kapat</button></div>
          </div>
        </div>
      )}

      {/* 2. DÜZENLEME MODALI */}
      <AssistantEditModal 
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        assistant={selectedAssistant}
        onUpdated={(updatedAssistant) => {
          setAssistants(prev => prev.map(a => a.id === updatedAssistant.id ? updatedAssistant : a));
        }}
      />

      {/* 3. YENİ: GEÇMİŞ MODALI */}
      <ChatHistoryModal 
        open={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        assistant={selectedAssistant}
      />
    </>
  );
}