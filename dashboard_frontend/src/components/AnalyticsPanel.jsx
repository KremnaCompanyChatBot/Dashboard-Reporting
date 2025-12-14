
import { useEffect, useState } from "react";
import axios from "axios";
import { Users, MessageSquare, Bot, Activity } from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

export default function AnalyticsPanel() {
  const [data, setData] = useState({
    stats: { totalAssistants: 0, totalMessages: 0, activeUsers: 0 },
    trafficData: [],
    assistantData: []
  });
  const [loading, setLoading] = useState(true);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/analytics")
      .then((res) => {
        // Backend'den gelen veriyi işle
        const raw = res.data;
        
        // 1. Tarihleri (YYYY-MM-DD) Gün İsmine Çevir (Pzt, Sal...)
        const formattedTraffic = raw.trafficData.map(item => ({
          name: new Date(item.date).toLocaleDateString('tr-TR', { weekday: 'short' }),
          mesaj: parseInt(item.count) // String gelen sayıyı int yap
        }));

        // 2. Asistan sayılarını int yap
        const formattedAssistant = raw.assistantData.map(item => ({
          name: item.name,
          value: parseInt(item.value)
        }));

        setData({
          stats: {
            totalAssistants: raw.totalAssistants,
            totalMessages: raw.totalMessages,
            activeUsers: raw.activeUsers
          },
          trafficData: formattedTraffic,
          assistantData: formattedAssistant
        });
        
        setLoading(false);
      })
      .catch((err) => {
        console.error("Veri hatası:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-10 text-center text-gray-500">Analizler hazırlanıyor...</div>;

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* KARTLAR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Toplam Asistan" 
          value={data.stats.totalAssistants} 
          icon={<Bot size={24} className="text-blue-600" />}
          color="bg-blue-50 border-blue-100" 
        />
        <StatCard 
          title="Toplam Mesaj" 
          value={data.stats.totalMessages} 
          icon={<MessageSquare size={24} className="text-green-600" />}
          color="bg-green-50 border-green-100" 
        />
        <StatCard 
          title="Toplam Sohbet" 
          value={data.stats.activeUsers} 
          icon={<Users size={24} className="text-purple-600" />}
          color="bg-purple-50 border-purple-100" 
        />
      </div>

      {/* GRAFİKLER */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* SOL: ÇİZGİ GRAFİK (TRAFİK) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Activity size={20} className="text-blue-500"/> 
            Son 7 Günlük Aktivite
          </h3>
          
          {data.trafficData.length > 0 ? (
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.trafficData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="mesaj" 
                    stroke="#2563eb" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 7 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-400 text-sm">
              Henüz yeterli veri yok.
            </div>
          )}
        </div>

        {/* SAĞ: PASTA GRAFİK (ASİSTAN DAĞILIMI) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Asistan Kullanım Oranı</h3>
          
          {data.assistantData.length > 0 && data.assistantData.some(d => d.value > 0) ? (
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.assistantData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.assistantData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} iconType="circle"/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-400 text-sm">
              Hiçbir asistanla konuşulmamış.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className={`p-5 rounded-xl border ${color} flex items-center gap-4 bg-white transition-all hover:shadow-md`}>
      <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}