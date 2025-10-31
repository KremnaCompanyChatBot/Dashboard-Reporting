// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import mockData from "../data/mock-data.json";

function StatCard({ title, value, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition"
    >
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">{value}</p>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();

  const [assistantsCount, setAssistantsCount] = useState(0);
  const [totalCta, setTotalCta] = useState(0);
  const [source, setSource] = useState("local"); // backend | local

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Assistants: GET http://localhost:3000/api/v1/assistants
        const a = await axios.get("http://localhost:3000/api/v1/assistants");
        // Analytics:  GET http://localhost:3000/api/v1/analytics/records
        const an = await axios.get("http://localhost:3000/api/v1/analytics/records");

        setAssistantsCount(Array.isArray(a.data) ? a.data.length : 0);
        const total = Array.isArray(an.data)
          ? an.data.reduce((sum, r) => sum + (r.count || 0), 0)
          : 0;
        setTotalCta(total);
        setSource("backend");
      } catch (e) {
        // Fallback: mock-data.json
        setAssistantsCount(mockData.assistants?.length || 0);
        const total = (mockData.analytics || []).reduce((sum, r) => sum + (r.count || 0), 0);
        setTotalCta(total);
        setSource("local");
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">Hoş geldin 👋</h1>
          <p className="text-gray-700 dark:text-gray-300 mt-1">
            Hızlı kartlardan özetlere bakabilir, detay için ilgili sayfaya gidebilirsin.
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            source === "backend"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {source === "backend" ? "Veri kaynağı: Backend" : "Veri kaynağı: Local Mock"}
        </span>
      </div>

      {/* Hızlı özet kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard title="Toplam Asistan" value={assistantsCount} onClick={() => navigate("/assistants")} />
        <StatCard title="CTA Tıklamaları (Toplam)" value={totalCta} onClick={() => navigate("/analytics")} />
        <StatCard title="Bildirimler" value="—" onClick={() => navigate("/")} />
      </div>

      {/* Hızlı linkler */}
      <div className="flex gap-3">
        <button
          onClick={() => navigate("/analytics")}
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Analytics’e Git
        </button>
        <button
          onClick={() => navigate("/assistants")}
          className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
        >
          Asistanlara Git
        </button>
      </div>
    </div>
  );
}
