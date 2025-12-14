import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return alert("Şifreler eşleşmiyor!");
    
    try {
      await register(formData.username, formData.email, formData.password);
      alert("Kayıt başarılı! Giriş yapabilirsiniz.");
      navigate("/login");
    } catch (err) {
      alert("Kayıt hatası: " + (err.response?.data?.message || "Bilinmeyen hata"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Kayıt Ol</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Kullanıcı Adı" required className="w-full p-2 border rounded"
            value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} />
          <input type="email" placeholder="Email" required className="w-full p-2 border rounded"
            value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <input type="password" placeholder="Şifre" required className="w-full p-2 border rounded"
            value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
          <input type="password" placeholder="Şifre Tekrar" required className="w-full p-2 border rounded"
            value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
            Kayıt Ol
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Zaten hesabın var mı? <Link to="/login" className="text-blue-600">Giriş Yap</Link>
        </p>
      </div>
    </div>
  );
}