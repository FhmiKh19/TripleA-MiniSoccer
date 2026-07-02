import FieldCard from "../../components/ui/FieldCard";
import BookingWidget from "../../components/booking/BookingWidget";
import { priceList, orderSteps, formatRupiah } from "../../data/seeder";
import { useAppData } from "../../context/AppDataContext";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import fieldAImg from "../../assets/field_a.jpg";

function Home() {
  const { fieldList } = useAppData();
  const { currentUser } = useAuth();
  const lowestPrice = Math.min(...priceList.map((item) => item.price));

  const fieldData = fieldList.map((field) => ({
    ...field,
    price: `${formatRupiah(lowestPrice)} / jam`,
  }));

  const scrollToBooking = () => {
    document.getElementById("booking-widget")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const stats = [
    { value: fieldList.length, label: "Lapangan Aktif", icon: "🏟️" },
    { value: "07:00–23:00", label: "Jam Operasional", icon: "🕐" },
    { value: "500+", label: "Booking Selesai", icon: "✅" },
    { value: "100%", label: "Kepuasan", icon: "⭐" },
  ];

  const dayIcons = ["🌅", "☀️", "🌙"];

  return (
    <div className="space-y-14 pb-10 animate-fade-in">

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden rounded-3xl"
        style={{ minHeight: "480px" }}
      >
        {/* Background hero image */}
        <img src={fieldAImg} alt="Hero" className="absolute inset-0 h-full w-full object-cover" />
        {/* Dark gradient over image */}
        <div className="absolute inset-0"
             style={{ background: "linear-gradient(135deg, rgba(8,12,20,0.95) 0%, rgba(8,12,20,0.75) 50%, rgba(8,12,20,0.5) 100%)" }} />
        {/* Gold glow */}
        <div className="absolute right-0 top-0 h-96 w-96 translate-x-1/4 -translate-y-1/4 rounded-full opacity-20 blur-3xl"
             style={{ background: "radial-gradient(circle, #F0A500, transparent)" }} />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(240,165,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(240,165,0,1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between gap-10 px-8 py-14 md:flex-row md:items-center md:px-16">
          <div className="max-w-xl">
            {/* Greeting pill */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-gold/25 bg-brand-gold/10 px-4 py-2 backdrop-blur-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-brand-gold" />
              <span className="text-xs font-bold text-brand-gold">
                Halo, {currentUser?.name?.split(" ")[0] || "Pemain"}! 👋 Siap main hari ini?
              </span>
            </div>

            <h1
              className="text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              Lapangan{" "}
              <span className="gradient-text">Mini Soccer</span>
              <br />Premium #1
            </h1>

            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-300">
              Booking real-time, bayar DP 50%, dan amankan slot main kamu dalam hitungan menit!
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={scrollToBooking}
                className="btn-gold px-8 py-4 text-sm font-black tracking-wide">
                ⚡ Pesan Sekarang
              </button>
              <Link to="/customer/history"
                className="flex items-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold text-slate-300 transition-all duration-200 hover:text-white"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}>
                Riwayat Saya →
              </Link>
            </div>

            {/* Stats row */}
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}
                  className="rounded-2xl p-3 text-center backdrop-blur-sm"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <p className="text-lg font-black text-brand-gold">{s.icon} {s.value}</p>
                  <p className="mt-0.5 text-[10px] text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Floating badge */}
          <div className="animate-float hidden shrink-0 flex-col items-center gap-3 md:flex">
            <div className="flex h-52 w-52 items-center justify-center rounded-3xl text-[5rem] shadow-2xl"
                 style={{ background: "rgba(240,165,0,0.1)", border: "1px solid rgba(240,165,0,0.25)", backdropFilter: "blur(16px)" }}>
              ⚽
            </div>
            <div className="rounded-2xl px-5 py-2 text-center"
                 style={{ background: "rgba(240,165,0,0.1)", border: "1px solid rgba(240,165,0,0.2)", backdropFilter: "blur(8px)" }}>
              <p className="text-xs font-bold text-brand-gold">⚡ Buka Sekarang</p>
              <p className="text-[10px] text-slate-400">Slot masih tersedia!</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOKING WIDGET ── */}
      <BookingWidget id="booking-widget" />

      {/* ── LAPANGAN ── */}
      <section>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-brand-gold">Pilih Lapangan</p>
            <h2 className="text-3xl font-black text-white" style={{ fontFamily: "Plus Jakarta Sans" }}>
              Lapangan Tersedia
            </h2>
            <p className="mt-1.5 text-sm text-slate-400">Lapangan premium siap booking sekarang</p>
          </div>
          <Link to="/customer/booking-form"
            className="hidden rounded-xl px-5 py-2.5 text-xs font-bold text-brand-gold transition-all duration-200 hover:text-brand-goldLight md:block"
            style={{ background: "rgba(240,165,0,0.06)", border: "1px solid rgba(240,165,0,0.12)" }}>
            Lihat semua →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {fieldData.map((field) => (
            <FieldCard key={field.id} field={field} />
          ))}
        </div>
      </section>

      {/* ── HARGA ── */}
      <section>
        <div className="mb-8 text-center">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-brand-gold">Transparan</p>
          <h2 className="text-3xl font-black text-white" style={{ fontFamily: "Plus Jakarta Sans" }}>
            Daftar Harga Sewa
          </h2>
          <p className="mt-1.5 text-sm text-slate-400">Harga disesuaikan berdasarkan hari dan waktu bermain</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {priceList.map((item, idx) => (
            <div key={item.id}
              className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              style={{ background: "linear-gradient(135deg, #141B28, #0F1520)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                   style={{ background: "radial-gradient(ellipse at top left, rgba(240,165,0,0.07), transparent 70%)" }} />
              <div className="relative">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="badge-gold text-[10px]">{item.day}</span>
                    <h3 className="mt-2 text-base font-bold text-white" style={{ fontFamily: "Plus Jakarta Sans" }}>
                      {item.label}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">{item.startTime} – {item.endTime}</p>
                  </div>
                  <span className="text-3xl opacity-[0.15] transition-opacity duration-300 group-hover:opacity-30">
                    {dayIcons[idx % 3]}
                  </span>
                </div>
                <p className="mt-5 text-2xl font-black text-brand-gold" style={{ fontFamily: "Plus Jakarta Sans" }}>
                  {formatRupiah(item.price)}
                  <span className="text-sm font-normal text-slate-500"> / jam</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CARA PESAN ── */}
      <section>
        <div className="mb-8 text-center">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-brand-gold">Mudah & Cepat</p>
          <h2 className="text-3xl font-black text-white" style={{ fontFamily: "Plus Jakarta Sans" }}>
            Cara Pemesanan
          </h2>
          <p className="mt-1.5 text-sm text-slate-400">3 langkah mudah untuk amankan lapangan kamu</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {orderSteps.map((step, idx) => (
            <div key={step.id}
              className="group relative overflow-hidden rounded-2xl p-7 text-center transition-all duration-300 hover:-translate-y-1"
              style={{ background: "linear-gradient(135deg, #141B28, #0F1520)", border: "1px solid rgba(255,255,255,0.06)" }}>
              {idx < orderSteps.length - 1 && (
                <div className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-brand-gold/20 text-2xl md:block">→</div>
              )}
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-black text-brand-dark transition-all duration-300 group-hover:scale-110"
                   style={{ background: "linear-gradient(135deg, #F0A500, #FFD166)", boxShadow: "0 8px 24px rgba(240,165,0,0.3)" }}>
                {step.id}
              </div>
              <h3 className="font-black text-white" style={{ fontFamily: "Plus Jakarta Sans" }}>{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative overflow-hidden rounded-3xl">
        <img src={fieldAImg} alt="CTA" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0"
             style={{ background: "linear-gradient(135deg, rgba(8,12,20,0.92), rgba(8,12,20,0.85))" }} />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "radial-gradient(circle, #F0A500 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }} />
        {/* Gold glow center */}
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
             style={{ background: "radial-gradient(circle, rgba(240,165,0,0.15), transparent)" }} />

        <div className="relative z-10 px-8 py-16 text-center md:py-20">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl text-4xl"
               style={{ background: "rgba(240,165,0,0.12)", border: "1px solid rgba(240,165,0,0.25)", backdropFilter: "blur(8px)" }}>
            ⚽
          </div>
          <h2 className="text-3xl font-black text-white md:text-4xl" style={{ fontFamily: "Plus Jakarta Sans" }}>
            Siap Untuk Bermain?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-slate-300">
            Amankan jadwal main kamu sekarang. Slot terbatas — jangan sampai kehabisan!
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button type="button" onClick={scrollToBooking}
              className="btn-gold px-10 py-4 text-sm font-black">
              ⚡ Pesan Lapangan Sekarang →
            </button>
            <Link to="/customer/history"
              className="rounded-xl px-6 py-4 text-sm font-semibold text-slate-300 transition-all hover:text-white"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}>
              Lihat Riwayat Saya
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
