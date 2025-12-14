import { useEffect, useState } from "react";
import axios from "axios";
import { Users, MessageSquare, Bot } from "lucide-react"; // İkonlar için

export default function AnalyticsPanel() {
  const [stats, setStats] = useState({
    totalAssistants: 0,
    totalMessages: 0,
    activeUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Backend'den gerçek verileri çek
    axios.get("http://localhost:3000/api/v1/analytics")
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("İstatistik hatası:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6 text-gray-500">İstatistikler yükleniyor...</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold mb-6 text-gray-800">Sistem Durumu</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Toplam Asistan" 
          value={stats.totalAssistants} 
          icon={<Bot size={24} className="text-blue-600" />}
          color="bg-blue-50 border-blue-100" 
        />
        <StatCard 
          title="Toplam Mesaj" 
          value={stats.totalMessages} 
          icon={<MessageSquare size={24} className="text-green-600" />}
          color="bg-green-50 border-green-100" 
        />
        <StatCard 
          title="Aktif Kullanıcılar" 
          value={stats.activeUsers} 
          icon={<Users size={24} className="text-purple-600" />}
          color="bg-purple-50 border-purple-100" 
        />
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className={`p-4 rounded-xl border ${color} flex items-center gap-4 transition-transform hover:scale-105`}>
      <div className="p-3 bg-white rounded-lg shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}