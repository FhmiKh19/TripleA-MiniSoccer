import { useRef, useState } from "react";
import StatusBadge from "../../components/ui/StatusBadge";

function UploadPayment() {
  const inputRef = useRef(null);
  const [hasFile, setHasFile] = useState(true);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-brand-dark">Upload Bukti Pembayaran</h1>
      <div className="mb-6 grid gap-4 rounded-xl bg-white p-6 shadow-sm md:grid-cols-2">
        <div className="space-y-1 text-sm"><p className="text-xs text-gray-500">ID Transaksi:</p><p className="text-lg font-bold text-brand-gold">TRX-20260001</p><p>Lapangan: Lapangan A</p><p>Jadwal: Jumat, 13 Mei 2026 | 19:00 - 21:00</p><p className="font-bold text-brand-gold">Total: Rp 160.000</p></div>
        <div><StatusBadge status="Menunggu Pembayaran" /><div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3"><p className="text-sm text-red-600">⏳ Sisa waktu pembayaran:</p><p className="text-center font-mono text-3xl font-black text-red-600">28:45</p><p className="text-center text-xs text-red-400">Selesaikan sebelum batas waktu habis</p></div></div>
      </div>
      <div className="mb-6 rounded-xl bg-white p-6 shadow-sm"><h3 className="font-semibold">Informasi Rekening Pembayaran</h3><div className="mt-4 flex flex-wrap items-center gap-3"><div className="h-8 w-16 rounded bg-gray-200" /><span className="font-bold">BCA</span><span className="text-xl font-black text-brand-dark">1234567890</span><span>a.n. Triple A Minisoccer</span><button className="rounded-lg bg-brand-gold px-3 py-1 text-xs font-semibold text-brand-dark">Salin</button></div></div>
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 font-semibold">Unggah Bukti Transfer</h3>
        <button onClick={() => inputRef.current?.click()} className="w-full cursor-pointer rounded-xl border-2 border-dashed border-brand-gold bg-amber-50 p-12 text-center transition-colors hover:bg-amber-100"><p className="text-4xl text-brand-gold">⬆</p><p className="mt-3 font-semibold text-brand-dark">Klik atau seret file ke sini</p><p className="mt-1 text-xs text-gray-400">Format: JPG atau PNG, maksimal 2 MB</p></button>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" />
        {hasFile && <div className="mt-4 flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3"><div className="h-12 w-12 rounded bg-gray-200" /><div><p className="text-sm font-medium">bukti_transfer.jpg</p><p className="text-xs text-gray-400">1.2 MB</p></div><button onClick={() => setHasFile(false)} className="ml-auto text-red-600">✕</button></div>}
        <button className="mt-6 w-full rounded-lg bg-brand-dark py-3 font-semibold text-white transition-all hover:bg-brand-gold hover:text-brand-dark">Kirim Bukti Pembayaran</button>
      </div>
    </div>
  );
}

export default UploadPayment;
