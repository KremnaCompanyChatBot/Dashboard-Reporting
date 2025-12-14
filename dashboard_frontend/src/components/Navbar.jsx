import { Bell, Search, User } from "lucide-react";
import { useAuth } from "../context/AuthContext"; // <-- 1. Auth Hook'unu çağır

export default function Navbar() {
  const { user } = useAuth(); // <-- 2. Kullanıcı bilgisini çek

  // Kullanıcı adı yoksa varsayılan göster
  const username = user?.username || "Misafir";
  const initial = username.charAt(0).toUpperCase();

  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
      
     

      {/* SAĞ TARA (Bildirim & Profil) */}
      <div className="flex items-center gap-6">
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
          <div className="text-right hidden md:block">
            {/* 3. DİNAMİK KULLANICI ADI */}
            <p className="text-sm font-semibold text-gray-800">{username}</p>
            <p className="text-xs text-gray-500">{user?.email || "Giriş Yapılmadı"}</p>
          </div>
          
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold border border-blue-200">
            {initial}
          </div>
        </div>
      </div>
    </div>
  );
}