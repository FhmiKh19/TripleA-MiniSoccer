import { Link } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";

function Login() {
  return (
    <AuthLayout>
      <div className="w-full max-w-sm">
        <p className="mb-8 text-center text-sm font-semibold text-brand-dark">⚽ Triple A Minisoccer</p>
        <h1 className="text-center text-3xl font-bold text-brand-dark">Selamat Datang Kembali!</h1>
        <p className="mb-8 mt-1 text-center text-sm text-gray-500">Masukkan detail akun Anda di bawah ini.</p>
        <div className="space-y-5">
          <div><label className="mb-1 block text-xs text-gray-500">Email</label><input placeholder="contoh@email.com" 
          className="w-full rounded-none border-0 border-b-2 border-gray-300 pb-2 
          text-sm outline-none transition-colors focus:border-brand-gold focus:ring-0" /></div>
          <div><label className="mb-1 block text-xs text-gray-500">Kata Sandi</label><div className="flex items-center 
          border-b-2 border-gray-300"><input type="password" placeholder="••••••••" 
          className="w-full border-0 pb-2 text-sm outline-none focus:ring-0" /><button className="pb-2">👁️</button></div></div>
          <div className="flex items-center justify-between text-xs">
            <label className="text-gray-500"><input type="checkbox" className="mr-2" />Ingat saya</label>
            <a className="text-brand-gold hover:underline">Lupa kata sandi?</a>
          </div>
          <button className="w-full rounded-full bg-brand-dark py-3 text-sm font-semibold text-white transition-all 
          duration-300 hover:bg-brand-gold hover:text-brand-dark">Masuk</button>
          <button className="w-full rounded-full border border-gray-200 bg-gray-100 py-3 text-sm font-semibold text-brand-dark 
          transition-all duration-200 hover:border-brand-gold">G Daftar dengan Google</button>
          <p className="mt-6 text-center text-xs text-gray-500">Belum punya akun? <Link to="/register" 
          className="font-semibold text-brand-gold hover:underline">Daftar</Link></p>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Login;
