import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../components/layout/AuthLayout";
import AuthField from "../../components/ui/AuthField";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email dan kata sandi harus diisi.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        if (result.role === "admin") navigate("/admin");
        else if (result.role === "owner") navigate("/owner");
        else navigate("/customer");
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Terjadi kesalahan saat login. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-sm">
        <p className="mb-8 text-center text-sm font-semibold text-brand-dark">
          ⚽ Triple A Minisoccer
        </p>
        <h1 className="text-center text-3xl font-bold text-brand-dark">
          Selamat Datang Kembali!
        </h1>
        <p className="mb-8 mt-1 text-center text-sm text-gray-500">
          Masukkan detail akun Anda di bawah ini.
        </p>

        {error && (
          <div className="mb-5 rounded-lg bg-red-100 p-3">
            <p className="text-xs text-red-600">{error}</p>
          </div>
        )}

        <div className="mb-6 rounded-lg bg-blue-50 p-3">
          <p className="mb-2 text-xs font-semibold text-blue-900">Akun Demo:</p>
          <p className="text-xs text-blue-800">Admin: ikhsan@triplea.com / admin123</p>
          <p className="text-xs text-blue-800">Owner: aji@triplea.com / owner123</p>
          <p className="text-xs text-blue-800">Customer: fahmi@gmail.com / user123</p>
        </div>

        <div className="space-y-5">
          <AuthField
            label="Email"
            type="email"
            placeholder="contoh@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyPress}
            autoComplete="email"
          />

          <AuthField
            label="Kata Sandi"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyPress}
            autoComplete="current-password"
            showToggle
            isVisible={showPassword}
            onToggle={() => setShowPassword((v) => !v)}
          />

          <div className="flex items-center justify-between text-xs">
            <label className="text-gray-500">
              <input type="checkbox" className="mr-2" />
              Ingat saya
            </label>
            <a href="#" className="text-brand-gold hover:underline">
              Lupa kata sandi?
            </a>
          </div>

          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded-full bg-brand-dark py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-gold hover:text-brand-dark disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>

          <p className="mt-6 text-center text-xs text-gray-500">
            Belum punya akun?{" "}
            <Link to="/register" className="font-semibold text-brand-gold hover:underline">
              Daftar
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Login;
