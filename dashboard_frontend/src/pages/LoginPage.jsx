import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/"); // Ana sayfaya yönlendir
    } catch (err) {
      alert("Giriş başarısız: " + (err.response?.data?.message || "Hata"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Giriş Yap</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" required className="w-full p-2 border rounded"
            value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Şifre" required className="w-full p-2 border rounded"
            value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Giriş Yap
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Hesabın yok mu? <Link to="/register" className="text-blue-600">Kayıt Ol</Link>
        </p>
      </div>
    </div>
  );
}