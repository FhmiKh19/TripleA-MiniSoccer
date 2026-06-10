import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import AuthField from "../../components/ui/AuthField";
import { users as seededUsers } from "../../data/seeder";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (emailValue) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

  const handleRegister = () => {
    setError("");
    setSuccess("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Semua field harus diisi.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Format email tidak valid.");
      return;
    }
    if (password.length < 6) {
      setError("Kata sandi minimal 6 karakter.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Kata sandi tidak cocok.");
      return;
    }

    const allUsers = [...seededUsers, ...JSON.parse(localStorage.getItem("users") || "[]")];
    if (allUsers.some((u) => u.email === email)) {
      setError("Email sudah terdaftar.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const newUser = { id: Date.now(), name, email, password, role: "customer" };
      const registeredUsers = JSON.parse(localStorage.getItem("users") || "[]");
      registeredUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(registeredUsers));
      setLoading(false);
      setSuccess("Pendaftaran berhasil! Redirecting ke login...");
      setTimeout(() => navigate("/login"), 1500);
    }, 500);
  };

  const strength = (() => {
    let s = 0;
    if (password.length >= 6) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();

  return (
    <AuthLayout>
      <div className="w-full max-w-sm">
        <p className="mb-8 text-center text-sm font-semibold text-brand-dark">
          ⚽ Triple A Minisoccer
        </p>
        <h1 className="text-center text-3xl font-bold text-brand-dark">Buat Akun Baru</h1>
        <p className="mb-6 mt-1 text-center text-sm text-gray-500">
          Isi data diri Anda untuk mendaftar.
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-3">
            <p className="text-xs text-red-600">{error}</p>
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-lg bg-green-100 p-3">
            <p className="text-xs text-green-600">{success}</p>
          </div>
        )}

        <div className="space-y-4">
          <AuthField
            label="Nama Lengkap"
            placeholder="Nama lengkap Anda"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
          <AuthField
            label="Email"
            type="email"
            placeholder="contoh@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <AuthField
            label="Kata Sandi"
            placeholder="Min. 6 karakter"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            showToggle
            isVisible={showPassword}
            onToggle={() => setShowPassword((v) => !v)}
          />

          {password && (
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`h-1 flex-1 rounded-full ${strength >= level ? "bg-brand-gold" : "bg-gray-200"}`}
                />
              ))}
              <span
                className={`text-xs ${
                  strength <= 1 ? "text-red-500" : strength <= 2 ? "text-yellow-500" : "text-green-500"
                }`}
              >
                {strength <= 1 ? "Lemah" : strength <= 2 ? "Sedang" : "Kuat"}
              </span>
            </div>
          )}

          <AuthField
            label="Konfirmasi Kata Sandi"
            placeholder="Ulangi kata sandi"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            showToggle
            isVisible={showConfirmPassword}
            onToggle={() => setShowConfirmPassword((v) => !v)}
          />

          <button
            type="button"
            onClick={handleRegister}
            disabled={loading}
            className="w-full rounded-full bg-brand-dark py-3 font-semibold text-white transition-all duration-200 hover:bg-brand-gold hover:text-brand-dark disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Daftar Sekarang"}
          </button>

          <p className="text-center text-xs text-gray-500">
            Sudah punya akun?{" "}
            <Link to="/login" className="font-semibold text-brand-gold hover:underline">
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Register;
