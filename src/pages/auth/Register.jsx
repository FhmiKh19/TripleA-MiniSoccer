import { Link } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";

function Register() {
  return (
    <AuthLayout>
      <div className="w-full max-w-sm">
        <p className="mb-8 text-center text-sm font-semibold text-brand-dark">⚽ Triple A Minisoccer</p>
        <h1 className="text-center text-3xl font-bold text-brand-dark">Buat Akun Baru</h1>
        <p className="mb-6 mt-1 text-center text-sm text-gray-500">Isi data diri Anda untuk mendaftar.</p>
        <div className="space-y-4">
          {["Nama Lengkap", "Nomor Telepon", "Email"].map((label, idx) => (
            <div key={label}><label className="mb-1 block text-xs text-gray-500">{label}</label><input placeholder={["Nama lengkap Anda","08xx-xxxx-xxxx","contoh@email.com"][idx]} className="w-full rounded-none border-0 border-b-2 border-gray-300 pb-2 text-sm outline-none focus:border-brand-gold" /></div>
          ))}
          <div><label className="mb-1 block text-xs text-gray-500">Kata Sandi</label><div className="flex items-center border-b-2 border-gray-300"><input type="password" placeholder="Min. 8 karakter" className="w-full border-0 pb-2 text-sm outline-none" /><button className="pb-2">👁️</button></div></div>
          <div className="flex items-center gap-2"><div className="h-1 flex-1 rounded-full bg-brand-gold" /><div className="h-1 flex-1 rounded-full bg-brand-gold" /><div className="h-1 flex-1 rounded-full bg-gray-200" /><div className="h-1 flex-1 rounded-full bg-gray-200" /><span className="text-xs text-yellow-500">Sedang</span></div>
          <div><label className="mb-1 block text-xs text-gray-500">Konfirmasi Kata Sandi</label><div className="flex items-center border-b-2 border-gray-300"><input type="password" placeholder="Ulangi kata sandi" className="w-full border-0 pb-2 text-sm outline-none" /><button className="pb-2">👁️</button></div></div>
          <button className="w-full rounded-full bg-brand-dark py-3 font-semibold text-white transition-all duration-200 hover:bg-brand-gold hover:text-brand-dark">Daftar Sekarang</button>
          <p className="text-center text-xs text-gray-500">Sudah punya akun? <Link to="/login" className="font-semibold text-brand-gold hover:underline">Masuk</Link></p>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Register;
