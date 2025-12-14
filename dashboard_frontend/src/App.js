import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AnalyticsPage from "./pages/AnalyticsPage";
import AssistantsPage from "./pages/AssistantsPage";
import { ThemeProvider } from "./context/ThemeContext";
import { SearchProvider } from "./context/SearchContext";

function App() {
  return (
    <ThemeProvider>
      <SearchProvider>
        <Router>
          <div className="flex bg-gray-100 dark:bg-gray-900 dark:text-gray-100 transition-colors">
            <Sidebar />
            <div className="flex-1 ml-64 min-h-screen">
              <Navbar />
              <div className="p-4">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/assistants" element={<AssistantsPage />} />
                </Routes>
              </div>
            </div>
          </div>
        </Router>
      </SearchProvider>
    </ThemeProvider>
  );
}

export default App;
