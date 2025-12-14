import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AnalyticsPage from "./pages/AnalyticsPage";
import AssistantsPage from "./pages/AssistantsPage";
import { ThemeProvider } from "./context/ThemeContext";
import { SearchProvider } from "./context/SearchContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Korumalı Rota
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-10 text-center">Yükleniyor...</div>;
  return user ? children : <Navigate to="/login" />;
};

// Dashboard İskeleti
function DashboardLayout() {
  return (
    <div className="flex bg-gray-100 min-h-screen font-sans">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Navbar /> {/* Artık dinamik user bilgisini gösterecek */}
        <div className="p-6 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/assistants" element={<AssistantsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <SearchProvider>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public Rotalar */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Private Rotalar */}
              <Route path="/*" element={
                <PrivateRoute>
                  <DashboardLayout />
                </PrivateRoute>
              } />
            </Routes>
          </Router>
        </AuthProvider>
      </SearchProvider>
    </ThemeProvider>
  );
}

export default App;