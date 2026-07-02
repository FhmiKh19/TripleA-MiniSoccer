import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import { useAuth } from "../../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName]             = useState("");
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword]       = useState(false);
  const [showConfirm, setShowConfirm]         = useState(false);
  const [error, setError]   = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState("");

  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const strength = (() => {
    let s = 0;
    if (password.length >= 6) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();

  const strengthLabel = ["", "Lemah", "Sedang", "Kuat", "Sangat Kuat"][strength] || "";
  const strengthColor = ["", "#F87171", "#FBBF24", "#34D399", "#10B981"][strength] || "#F87171";

  const handleRegister = async () => {
    setError(""); setSuccess("");
    if (!name || !email || !password || !confirmPassword) { setError("Semua field harus diisi."); return; }
    if (!validateEmail(email)) { setError("Format email tidak valid."); return; }
    if (password.length < 6) { setError("Kata sandi minimal 6 karakter."); return; }
    if (password !== confirmPassword) { setError("Kata sandi tidak cocok."); return; }

    setLoading(true);
    try {
      let result;
      if (register) {
        result = await register(name, email, password);
      } else {
        // fallback localStorage
        const { users: seededUsers } = await import("../../data/seeder");
        const all = [...seededUsers, ...JSON.parse(localStorage.getItem("users") || "[]")];
        if (all.some((u) => u.email === email)) { setError("Email sudah terdaftar."); setLoading(false); return; }
        const newUser = { id: Date.now(), name, email, password, role: "customer" };
        const registered = JSON.parse(localStorage.getItem("users") || "[]");
        registered.push(newUser);
        localStorage.setItem("users", JSON.stringify(registered));
        result = { success: true };
      }
      if (result?.success === false) { setError(result.message || "Gagal mendaftar."); return; }
      setSuccess("Akun berhasil dibuat! Mengarahkan ke halaman login...");
      setTimeout(() => navigate("/login"), 1800);
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `flex items-center rounded-xl border px-4 py-3 transition-all duration-200 ${
      focused === field
        ? "border-brand-gold bg-brand-gold/5 shadow-[0_0_0_3px_rgba(240,165,0,0.12)]"
        : "border-white/8 bg-white/3 hover:border-white/15"
    }`;

  return (
    <AuthLayout>
      <div className="w-full max-w-sm animate-slide-up">
        {/* Header */}
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-extrabold text-white" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            Buat Akun Baru 🚀
          </h1>
          <p className="mt-2 text-sm text-slate-400">Daftar sekarang dan mulai pesan lapangan</p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-4 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 animate-fade-in">
            <span className="mt-0.5 text-red-400">⚠</span>
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}
        {success && (
          <div className="mb-4 flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 animate-fade-in">
            <span className="mt-0.5 text-emerald-400">✓</span>
            <p className="text-sm text-emerald-300">{success}</p>
          </div>
        )}

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">Nama Lengkap</label>
            <div className={inputClass("name")}>
              <svg className="mr-3 h-4 w-4 shrink-0 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <input className="auth-input flex-1" placeholder="Nama lengkap Anda" value={name}
                onChange={(e) => setName(e.target.value)} onFocus={() => setFocused("name")} onBlur={() => setFocused("")} autoComplete="name" />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">Email</label>
            <div className={inputClass("email")}>
              <svg className="mr-3 h-4 w-4 shrink-0 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
              <input type="email" className="auth-input flex-1" placeholder="contoh@email.com" value={email}
                onChange={(e) => setEmail(e.target.value)} onFocus={() => setFocused("email")} onBlur={() => setFocused("")} autoComplete="email" />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">Kata Sandi</label>
            <div className={inputClass("password")}>
              <svg className="mr-3 h-4 w-4 shrink-0 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <input type={showPassword ? "text" : "password"} className="auth-input flex-1" placeholder="Min. 6 karakter" value={password}
                onChange={(e) => setPassword(e.target.value)} onFocus={() => setFocused("password")} onBlur={() => setFocused("")} autoComplete="new-password" />
              <button type="button" onClick={() => setShowPassword(v => !v)} className="ml-2 text-slate-500 hover:text-slate-300 transition-colors">
                {showPassword
                  ? <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                  : <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                }
              </button>
            </div>

            {/* Strength bar */}
            {password && (
              <div className="mt-2 space-y-1 animate-fade-in">
                <div className="flex gap-1">
                  {[1,2,3,4].map((lvl) => (
                    <div key={lvl} className="h-1.5 flex-1 rounded-full transition-all duration-300"
                      style={{ background: strength >= lvl ? strengthColor : 'rgba(255,255,255,0.08)' }} />
                  ))}
                </div>
                <p className="text-xs" style={{ color: strengthColor }}>{strengthLabel}</p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">Konfirmasi Kata Sandi</label>
            <div className={inputClass("confirm")}>
              <svg className="mr-3 h-4 w-4 shrink-0 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <input type={showConfirm ? "text" : "password"} className="auth-input flex-1" placeholder="Ulangi kata sandi" value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} onFocus={() => setFocused("confirm")} onBlur={() => setFocused("")} autoComplete="new-password" />
              <button type="button" onClick={() => setShowConfirm(v => !v)} className="ml-2 text-slate-500 hover:text-slate-300 transition-colors">
                {showConfirm
                  ? <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                  : <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                }
              </button>
            </div>
            {confirmPassword && password !== confirmPassword && (
              <p className="mt-1 text-xs text-red-400 animate-fade-in">⚠ Kata sandi tidak cocok</p>
            )}
          </div>

          {/* Terms */}
          <label className="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-white/20 accent-brand-gold" required />
            <span className="text-xs text-slate-400">
              Saya menyetujui{" "}
              <a href="#" className="text-brand-gold hover:underline">Syarat & Ketentuan</a>{" "}
              serta{" "}
              <a href="#" className="text-brand-gold hover:underline">Kebijakan Privasi</a>
            </span>
          </label>

          {/* Submit */}
          <button type="button" onClick={handleRegister} disabled={loading}
            className="btn-gold w-full py-3.5 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-dark/30 border-t-brand-dark" />
                Memproses...
              </span>
            ) : "Buat Akun Sekarang →"}
          </button>

          <div className="divider-gold" />

          <p className="text-center text-xs text-slate-500">
            Sudah punya akun?{" "}
            <Link to="/login" className="font-semibold text-brand-gold hover:text-brand-goldLight transition-colors">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Register;
