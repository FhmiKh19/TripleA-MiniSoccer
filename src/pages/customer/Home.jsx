import FieldCard from "../../components/ui/FieldCard";
import { fields, priceList, orderSteps, formatRupiah } from "../../data/seeder";

function Home() {
  const lowestPrice = Math.min(...priceList.map((item) => item.price));

  const fieldData = fields.map((field) => ({
    ...field,
    price: `Mulai ${formatRupiah(lowestPrice)} / jam`,
  }));

  return (
    <div className="space-y-10">
      <section className="relative min-h-72 overflow-hidden rounded-2xl bg-brand-dark">
        <div className="relative z-10 max-w-xl px-12 py-16">
          <h1 className="text-4xl font-black text-white">Pesan Lapangan</h1>
          <h1 className="text-4xl font-black text-brand-gold">
            Mini Soccer Favorit Kamu
          </h1>
          <p className="mt-3 text-base text-gray-300">
            Jadwal real-time, booking mudah, cukup bayar DP 50% untuk mengamankan jadwal.
          </p>
          <button className="mt-6 rounded-full bg-brand-gold px-8 py-3 font-bold text-brand-dark transition-all duration-200 hover:scale-105 hover:bg-brand-goldLight">
            Pesan Sekarang
          </button>
        </div>

        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[200px] opacity-20">
          ⚽
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-brand-dark">Lapangan Tersedia</h2>
        <p className="mb-6 mt-1 text-sm text-gray-500">
          Pilih lapangan terbaik untuk sesi main kamu
        </p>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {fieldData.map((field) => (
            <FieldCard key={field.id} field={field} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-brand-dark">Daftar Harga</h2>
        <p className="mb-6 mt-1 text-sm text-gray-500">
          Harga sewa lapangan berdasarkan hari dan jam bermain
        </p>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {priceList.map((item) => (
            <div
              key={item.id}
              className="rounded-xl bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-sm font-semibold text-brand-gold">
                {item.day}
              </p>
              <h3 className="mt-2 text-lg font-bold text-brand-dark">
                {item.label}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {item.startTime} - {item.endTime}
              </p>
              <p className="mt-4 text-2xl font-black text-brand-dark">
                {formatRupiah(item.price)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold text-brand-dark">
          Cara Pemesanan
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          {orderSteps.map((step) => (
            <div
              key={step.id}
              className="rounded-xl bg-white p-6 text-center shadow-sm"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-dark text-xl font-black text-brand-gold">
                {step.id}
              </div>
              <p className="mt-2 font-semibold text-brand-dark">
                {step.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;