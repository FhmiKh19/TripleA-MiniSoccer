import { useState, useEffect } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getHomePathForRole } from "../../utils/authHelpers";
import AuthLayout from "../../components/layout/AuthLayout";

function Login() {
  const { login, currentUser, authLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState("");

  useEffect(() => {
    if (!authLoading && currentUser) {
      navigate(getHomePathForRole(currentUser.role), { replace: true });
    }
  }, [authLoading, currentUser, navigate]);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-dark">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-surface border-t-brand-gold" />
          <p className="text-sm text-slate-400">Memuat sesi...</p>
        </div>
      </div>
    );
  }

  if (currentUser) return <Navigate to={getHomePathForRole(currentUser.role)} replace />;

  const handleLogin = async () => {
    if (!email || !password) { setError("Email dan kata sandi harus diisi."); return; }
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
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => { if (e.key === "Enter") handleLogin(); };

  const demoAccounts = [
    { role: "Admin",    email: "ikhsan@triplea.com", pw: "admin123", icon: "🛡️" },
    { role: "Owner",    email: "aji@triplea.com",    pw: "owner123", icon: "👑" },
    { role: "Customer", email: "fahmi@gmail.com",    pw: "user123",  icon: "⚽" },
  ];

  return (
    <AuthLayout>
      <div className="w-full max-w-sm animate-slide-up">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-white" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            Selamat Datang 👋
          </h1>
          <p className="mt-2 text-sm text-slate-400">Masuk untuk melanjutkan ke akun Anda</p>
        </div>

        {/* Error alert */}
        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 animate-fade-in">
            <span className="mt-0.5 text-red-400">⚠</span>
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        {/* Demo accounts */}
        <div className="mb-6 rounded-xl border border-brand-gold/15 bg-brand-gold/5 p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-gold">
            🔑 Akun Demo
          </p>
          <div className="space-y-2">
            {demoAccounts.map((acc) => (
              <button
                key={acc.role}
                type="button"
                onClick={() => { setEmail(acc.email); setPassword(acc.pw); }}
                className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left text-xs transition-all duration-150 hover:bg-brand-gold/10"
              >
                <span>{acc.icon}</span>
                <span className="font-semibold text-brand-gold w-16">{acc.role}</span>
                <span className="text-slate-400 truncate">{acc.email}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Email */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Email
            </label>
            <div className={`flex items-center rounded-xl border px-4 py-3 transition-all duration-200 ${
              focused === "email"
                ? "border-brand-gold bg-brand-gold/5 shadow-[0_0_0_3px_rgba(240,165,0,0.12)]"
                : "border-white/8 bg-white/3 hover:border-white/15"
            }`}>
              <svg className="mr-3 h-4 w-4 shrink-0 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
              <input
                type="email"
                className="auth-input flex-1"
                placeholder="contoh@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused("")}
                onKeyDown={handleKey}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Kata Sandi
            </label>
            <div className={`flex items-center rounded-xl border px-4 py-3 transition-all duration-200 ${
              focused === "password"
                ? "border-brand-gold bg-brand-gold/5 shadow-[0_0_0_3px_rgba(240,165,0,0.12)]"
                : "border-white/8 bg-white/3 hover:border-white/15"
            }`}>
              <svg className="mr-3 h-4 w-4 shrink-0 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                className="auth-input flex-1"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused("")}
                onKeyDown={handleKey}
                autoComplete="current-password"
              />
              <button type="button" onClick={() => setShowPassword((v) => !v)} className="ml-2 text-slate-500 hover:text-slate-300 transition-colors">
                {showPassword ? (
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember & forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="h-4 w-4 rounded border-white/20 bg-transparent accent-brand-gold" />
              <span className="text-xs text-slate-400">Ingat saya</span>
            </label>
            <a href="#" className="text-xs font-medium text-brand-gold hover:text-brand-goldLight transition-colors">
              Lupa kata sandi?
            </a>
          </div>

          {/* Submit button */}
          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="btn-gold w-full py-3.5 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-dark/30 border-t-brand-dark" />
                Memproses...
              </span>
            ) : "Masuk Sekarang →"}
          </button>

          {/* Divider */}
          <div className="divider-gold my-2" />

          <p className="text-center text-xs text-slate-500">
            Belum punya akun?{" "}
            <Link to="/register" className="font-semibold text-brand-gold hover:text-brand-goldLight transition-colors">
              Daftar Gratis
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Login;
