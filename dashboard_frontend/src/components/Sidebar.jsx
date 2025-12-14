import React, { useContext } from "react";
import { BarChart3, Home, Bot, Sun, Moon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

function Sidebar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const menuItems = [
    { name: "Anasayfa", icon: <Home size={20} />, path: "/" },
    { name: "Analytics", icon: <BarChart3 size={20} />, path: "/analytics" },
    { name: "Asistanlar", icon: <Bot size={20} />, path: "/assistants" },
  ];

  return (
    <div className="h-screen bg-gray-900 dark:bg-gray-800 text-gray-100 w-64 flex flex-col fixed left-0 top-0 shadow-lg transition-colors duration-300">
      {/* Üst kısım: logo + tema butonu */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <div className="text-2xl font-bold text-blue-400">
          Chatbot Dashboard
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-gray-700 transition"
        >
          {theme === "light" ? (
            <Moon size={20} className="text-gray-300" />
          ) : (
            <Sun size={20} className="text-yellow-400" />
          )}
        </button>
      </div>

      {/* Menü */}
      <nav className="flex-1 p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-md mb-2 cursor-pointer transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800 hover:text-blue-300"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Alt bilgi */}
      <div className="text-xs text-gray-500 text-center mb-3 border-t border-gray-700 pt-3">
        © {new Date().getFullYear()} Chatbot Team
      </div>
    </div>
  );
}

export default Sidebar;
