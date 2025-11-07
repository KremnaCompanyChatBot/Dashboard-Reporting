import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import mockData from "../data/mock-data.json";
import { UserCircleIcon, Plus, Trash2 } from "lucide-react";
import { SearchContext } from "../context/SearchContext";
import AssistantCreateModal from "./AssistantCreateModal";
import { useToast } from "./Toast";

function AssistantList() {
  const [assistants, setAssistants] = useState([]);
  const [dataSource, setDataSource] = useState("local");
  const { searchTerm } = useContext(SearchContext);
  const [openCreate, setOpenCreate] = useState(false);
  const [busyId, setBusyId] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/assistants");
        setAssistants(res.data);
        setDataSource("backend");
        console.log("✅ Veri backend'den alındı.");
      } catch (err) {
        console.warn("⚠️ Backend kapalı, mock-data kullanılıyor.");
        showToast("Backend kapalı, mock veri gösteriliyor", "warning");
        setAssistants(mockData.assistants);
        setDataSource("local");
      }
    };
    fetchData();
  }, [showToast]);

  const filteredAssistants = assistants.filter((a) =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreated = (newAssistant) => {
    setAssistants((prev) => [newAssistant, ...prev]);
  };

  const removeAssistant = async (assistantId) => {
    if (!window.confirm("Bu asistanı silmek istediğine emin misin?")) return;

    setBusyId(assistantId);
    const previous = assistants;

    setAssistants((p) => p.filter((x) => x.assistantId !== assistantId));

    try {
      await axios.delete(
        `http://localhost:3000/api/v1/assistants/${encodeURIComponent(
          assistantId
        )}`
      );

      showToast("Asistan silindi ✅", "success");
    } catch (err) {
      showToast("Silme başarısız, işlem geri alındı ❌", "error");
      setAssistants(previous);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-8 max-w-6xl mx-auto mt-10 transition-colors">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 md:mb-0">
          Asistanlar
        </h2>

        <div className="flex items-center gap-3">
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              dataSource === "backend"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {dataSource === "backend"
              ? "Veri kaynağı: Backend"
              : "Veri kaynağı: Local Mock"}
          </span>

          <button
            onClick={() => setOpenCreate(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            <Plus size={18} /> Yeni Asistan
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4 inline-block shadow-sm">
          <h3 className="text-gray-600 dark:text-gray-300 text-sm font-semibold">
            Toplam Asistan
          </h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {filteredAssistants.length}
          </p>
        </div>
      </div>

      {filteredAssistants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssistants.map((a) => (
            <div
              key={a.assistantId}
              className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-6 hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center mb-3">
                  <UserCircleIcon className="w-8 h-8 text-blue-500 mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      {a.name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      ID: {a.assistantId}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeAssistant(a.assistantId)}
                  disabled={busyId === a.assistantId}
                  className="p-2 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 transition"
                >
                  {busyId === a.assistantId ? "..." : <Trash2 size={18} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 mt-6 text-center">
          Aradığın kriterlere uygun asistan bulunamadı.
        </p>
      )}

      <AssistantCreateModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreated={handleCreated}
      />
    </div>
  );
}

export default AssistantList;
