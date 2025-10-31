import React, { useEffect, useState } from "react";
import axios from "axios";
import mockData from "../data/mock-data.json";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function AnalyticsPanel() {
  const [analytics, setAnalytics] = useState([]);
  const [source, setSource] = useState("local");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/analytics/records");
        setAnalytics(res.data);
        setSource("backend");
        console.log("✅ Analytics backend'den alındı.");
      } catch (err) {
        console.warn("⚙️ Backend kapalı, mock analytics kullanılıyor.");
        setAnalytics(mockData.analytics);
        setSource("local");
      }
    };
    fetchAnalytics();
  }, []);

  const COLORS = ["#60A5FA", "#FBBF24", "#34D399", "#F87171"]; // Mavi, sarı, yeşil, kırmızı

  // 📈 Özet metrik hesaplamaları
  const totalClicks = analytics.reduce((sum, item) => sum + (item.count || 0), 0);
  const topItem = analytics.reduce((max, item) =>
    item.count > (max?.count || 0) ? item : max,
    null
  );

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 max-w-6xl mx-auto mt-10">
      {/* Başlık */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          Landing Sayfası Etkileşimi (CTA)
        </h2>
        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            source === "backend"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {source === "backend"
            ? "Veri kaynağı: Backend"
            : "Veri kaynağı: Local Mock"}
        </span>
      </div>

      {/* Pasta grafik */}
      <div className="flex justify-center">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={analytics}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="count"
              nameKey="event_label"
              label
            >
              {analytics.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Özet metrik kutucukları */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 shadow-sm">
          <h3 className="text-gray-600 text-sm font-semibold">Toplam Tıklama</h3>
          <p className="text-3xl font-bold text-blue-600">{totalClicks}</p>
        </div>

        {topItem && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5 shadow-sm">
            <h3 className="text-gray-600 text-sm font-semibold">
              En Çok Tıklanan Buton
            </h3>
            <p className="text-lg font-bold text-yellow-700">{topItem.event_label}</p>
            <p className="text-sm text-gray-500">{topItem.count} tıklama</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnalyticsPanel;
