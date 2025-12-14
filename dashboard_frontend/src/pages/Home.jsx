// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bot, MessageSquare, Activity } from "lucide-react"; // İkonları ekleyelim (isteğe bağlı)

function StatCard({ title, value, icon, onClick, colorClass }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex items-center gap-4"
    >
      <div className={`p-3 rounded-lg ${colorClass || "bg-blue-50 text-blue-600"}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalAssistants: 0,
    totalMessages: 0,
    activeUsers: 0
  });
  
  const [source, setSource] = useState("yükleniyor...");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Backend'deki Analytics servisine tek istek atıyoruz
        // Bu endpoint bize { totalAssistants, totalMessages, activeUsers } dönüyor
        const res = await axios.get("http://localhost:3000/api/v1/analytics");
        
        setStats(res.data);
        setSource("backend");
      } catch (e) {
        console.error("Backend bağlantı hatası:", e);
        // Hata durumunda 0 göster veya mock veriye dön
        setSource("bağlantı hatası (mock)");
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-8 p-10 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Hoş geldin 👋</h1>
          <p className="text-gray-500 mt-1">
            Sistem durumunu buradan hızlıca takip edebilirsin.
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            source === "backend"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          Durum: {source === "backend" ? "Canlı Veri (Backend)" : "Bağlantı Yok"}
        </span>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard 
          title="Toplam Asistan" 
          value={stats.totalAssistants} 
          icon={<Bot size={24} />}
          colorClass="bg-blue-100 text-blue-600"
          onClick={() => navigate("/assistants")} 
        />
        <StatCard 
          title="Toplam Mesaj" 
          value={stats.totalMessages} 
          icon={<MessageSquare size={24} />}
          colorClass="bg-green-100 text-green-600"
          onClick={() => navigate("/analytics")} 
        />
        <StatCard 
          title="Toplam Sohbet" 
          value={stats.activeUsers} 
          icon={<Activity size={24} />}
          colorClass="bg-purple-100 text-purple-600"
          onClick={() => navigate("/analytics")} 
        />
      </div>

      {/* Hızlı Aksiyonlar */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Hızlı İşlemler</h3>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/assistants")}
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
          >
            Asistanları Yönet
          </button>
          <button
            onClick={() => navigate("/analytics")}
            className="px-5 py-2.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition font-medium"
          >
            Raporları İncele
          </button>
        </div>
      </div>
    </div>
  );
}