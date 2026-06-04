import FieldCard from "../../components/ui/FieldCard";

const fields = [
  { name: "Lapangan A", price: "Rp 80.000 / jam", status: "Aktif", description: "Lapangan standar dengan pencahayaan penuh" },
  { name: "Lapangan B", price: "Rp 75.000 / jam", status: "Aktif", description: "Cocok untuk latihan tim kecil" },
  { name: "Lapangan C", price: "Rp 90.000 / jam", status: "Aktif", description: "Lapangan premium dengan rumput sintetis terbaik" },
  { name: "Lapangan VIP", price: "Rp 120.000 / jam", status: "Renovasi", description: "Sedang dalam proses renovasi" },
];

function Home() {
  return (
    <div className="space-y-10">
      <section className="relative min-h-72 overflow-hidden rounded-2xl bg-brand-dark">
        <div className="relative z-10 max-w-xl px-12 py-16">
          <h1 className="text-4xl font-black text-white">Pesan Lapangan</h1>
          <h1 className="text-4xl font-black text-brand-gold">Mini Soccer Favorit Kamu</h1>
          <p className="mt-3 text-base text-gray-300">Jadwal real-time, booking mudah, tanpa antri.</p>
          <button className="mt-6 rounded-full bg-brand-gold px-8 py-3 font-bold text-brand-dark transition-all duration-200 hover:scale-105 hover:bg-brand-goldLight">Pesan Sekarang</button>
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[200px] opacity-20">⚽</div>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-brand-dark">Lapangan Tersedia</h2>
        <p className="mb-6 mt-1 text-sm text-gray-500">Pilih lapangan terbaik untuk sesi main kamu</p>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{fields.map((field) => <FieldCard key={field.name} field={field} />)}</div>
      </section>
      <section>
        <h2 className="mb-6 text-2xl font-bold text-brand-dark">Cara Pemesanan</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[["1","🔍","Cek Jadwal","Lihat ketersediaan lapangan secara real-time kapan saja."],["2","📋","Isi Form Booking","Pilih tanggal, jam, dan lapangan sesuai keinginan kamu."],["3","💳","Upload Pembayaran","Transfer dan upload bukti bayar agar pesanan dikonfirmasi."]].map((item)=>(
            <div key={item[0]} className="rounded-xl bg-white p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-dark text-xl font-black text-brand-gold">{item[0]}</div>
              <p className="text-3xl">{item[1]}</p><p className="mt-2 font-semibold text-brand-dark">{item[2]}</p><p className="mt-1 text-sm text-gray-500">{item[3]}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
