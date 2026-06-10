import FieldCard from "../../components/ui/FieldCard";
import BookingWidget from "../../components/booking/BookingWidget";
import { fields, priceList, orderSteps, formatRupiah } from "../../data/seeder";

function Home() {
  const lowestPrice = Math.min(...priceList.map((item) => item.price));

  const fieldData = fields.map((field) => ({
    ...field,
    price: `Mulai ${formatRupiah(lowestPrice)} / jam`,
  }));

  const scrollToBooking = () => {
    document.getElementById("booking-widget")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="space-y-10">
      <section className="relative min-h-80 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-surface to-brand-dark border border-brand-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(200,155,0,0.12)_0%,_transparent_60%)]" />
        <div className="relative z-10 max-w-xl px-8 py-14 md:px-12 md:py-16">
          <h1 className="text-4xl font-black text-white md:text-5xl">Pesan Lapangan</h1>
          <h2 className="text-4xl font-black text-brand-gold md:text-5xl">
            Mini Soccer Favorit Kamu
          </h2>
          <p className="mt-4 text-base text-gray-400">
            Jadwal real-time, booking mudah, cukup bayar DP 50% untuk mengamankan jadwal.
          </p>
          <button
            type="button"
            onClick={scrollToBooking}
            className="mt-8 rounded-full bg-brand-gold px-8 py-3.5 font-bold text-brand-dark transition-all duration-200 hover:scale-105 hover:bg-brand-goldLight"
          >
            Pesan Sekarang
          </button>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[140px] opacity-10 md:right-8 md:text-[200px]">
          ⚽
        </div>
      </section>

      <BookingWidget id="booking-widget" />

      <section>
        <h2 className="text-2xl font-bold text-white">Lapangan Tersedia</h2>
        <p className="mb-6 mt-1 text-sm text-gray-400">
          Pilih lapangan terbaik untuk sesi main kamu
        </p>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {fieldData.map((field) => (
            <FieldCard key={field.id} field={field} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white">Daftar Harga</h2>
        <p className="mb-6 mt-1 text-sm text-gray-400">
          Harga sewa lapangan berdasarkan hari dan jam bermain
        </p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {priceList.map((item) => (
            <div
              key={item.id}
              className="premium-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-brand-gold/40"
            >
              <p className="text-sm font-semibold text-brand-gold">{item.day}</p>
              <h3 className="mt-2 text-lg font-bold text-white">{item.label}</h3>
              <p className="mt-1 text-sm text-gray-400">
                {item.startTime} - {item.endTime}
              </p>
              <p className="mt-4 text-2xl font-black text-brand-gold">
                {formatRupiah(item.price)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold text-white">Cara Pemesanan</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {orderSteps.map((step) => (
            <div key={step.id} className="premium-card p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold text-xl font-black text-brand-dark">
                {step.id}
              </div>
              <p className="mt-2 font-semibold text-white">{step.title}</p>
              <p className="mt-1 text-sm text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
