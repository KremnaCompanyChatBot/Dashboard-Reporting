// src/components/Navbar.jsx
import React, { useContext, useEffect, useRef, useState } from "react";
import { Search, Bell, ChevronDown, CheckCircle } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";
import { SearchContext } from "../context/SearchContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { theme } = useContext(ThemeContext);
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const [openProfile, setOpenProfile] = useState(false);
  const [openBell, setOpenBell] = useState(false);
  const profileRef = useRef(null);
  const bellRef = useRef(null);
  const navigate = useNavigate();

  // Basit mock bildirimler (backend’e geçince API’den gelir)
  const [notifications, setNotifications] = useState([
    { id: 1, text: "AI Matematikçi asistanı güncellendi", read: false },
    { id: 2, text: "Landing sayfası CTA tıklamaları arttı", read: false },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Dışarı tıklayınca dropdown’ları kapat
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setOpenBell(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="flex justify-between items-center px-6 py-3 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      {/* 🔍 Arama kutusu */}
      <div className="relative w-1/3">
        <Search className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" size={18} />
        <input
          type="text"
          placeholder="Ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
      </div>

      {/* 🔔 Bildirim + Kullanıcı */}
      <div className="flex items-center gap-5">
        {/* Bell */}
        <div className="relative" ref={bellRef}>
          <button
            onClick={() => setOpenBell(!openBell)}
            className="relative p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Bildirimler"
          >
            <Bell className="text-gray-600 dark:text-gray-300" size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 text-[11px] flex items-center justify-center bg-red-500 text-white rounded-full">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Bildirim dropdown */}
          {openBell && (
            <div className="absolute right-0 top-11 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Bildirimler
                </span>
                <button
                  onClick={markAllAsRead}
                  className="text-xs flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                  title="Tümünü okundu yap"
                >
                  <CheckCircle size={14} />
                  Okundu
                </button>
              </div>
              <ul className="max-h-72 overflow-auto">
                {notifications.length === 0 && (
                  <li className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                    Bildirim yok
                  </li>
                )}
                {notifications.map(n => (
                  <li
                    key={n.id}
                    className={`px-4 py-3 text-sm border-b border-gray-100 dark:border-gray-700 ${
                      n.read ? "text-gray-500 dark:text-gray-400" : "text-gray-800 dark:text-gray-200 bg-blue-50/40 dark:bg-blue-900/10"
                    }`}
                  >
                    {n.text}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Profil */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setOpenProfile(!openProfile)}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
            aria-label="Profil menüsü"
          >
            <img
              src="https://ui-avatars.com/api/?name=Batus&background=60A5FA&color=fff&size=40"
              alt="user"
              className="w-8 h-8 rounded-full"
            />
            <span className="font-medium text-gray-700 dark:text-gray-200">Batuş</span>
            <ChevronDown size={18} className="text-gray-500 dark:text-gray-300" />
          </button>

          {/* Profil dropdown */}
          {openProfile && (
            <div className="absolute right-0 top-11 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Batuş</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">batus@example.com</p>
              </div>
              <ul className="text-sm text-gray-700 dark:text-gray-300">
                <li
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => { setOpenProfile(false); navigate("/assistants"); }}
                >
                  Profilim
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => { setOpenProfile(false); navigate("/analytics"); }}
                >
                  Ayarlar
                </li>
                <li
                  className="px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer border-t border-gray-100 dark:border-gray-700"
                  onClick={() => { setOpenProfile(false); alert("Çıkış işlemi burada tetiklenecek (auth bağlanınca)."); }}
                >
                  Çıkış Yap
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
