import { Link, useLocation, useNavigate } from "react-router-dom"; // useNavigate ekle
import { LayoutDashboard, MessageSquare, PieChart, Settings, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext"; // <-- Auth Hook'unu çağır

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth(); // <-- Logout fonksiyonunu al

  // Çıkış Fonksiyonu
  const handleLogout = () => {
    if (window.confirm("Çıkış yapmak istediğinize emin misiniz?")) {
      logout();
      navigate("/login");
    }
  };

  const menuItems = [
    { path: "/", icon: <LayoutDashboard size={20} />, label: "Genel Bakış" },
    { path: "/assistants", icon: <MessageSquare size={20} />, label: "Asistanlarım" },
    { path: "/analytics", icon: <PieChart size={20} />, label: "Raporlar" },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm">K</span>
          Kremna Dashboard
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              location.pathname === item.path
                ? "bg-blue-50 text-blue-600 font-medium"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      {/* ALT KISIM: ÇIKIŞ YAP */}
      <div className="p-4 border-t border-gray-100">
       
        
        {/* LOGOUT BUTONU */}
        <button 
          onClick={handleLogout} // <-- Tıklayınca çalışacak
          className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg w-full transition-colors"
        >
          <LogOut size={20} />
          Çıkış Yap
        </button>
      </div>
    </div>
  );
}