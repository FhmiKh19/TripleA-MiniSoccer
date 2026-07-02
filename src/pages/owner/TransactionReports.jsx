import { useState, useMemo, useEffect } from "react";
import StatusBadge from "../../components/ui/StatusBadge";
import { useAppData } from "../../context/AppDataContext";
import { mapBookingFromApi } from "../../utils/apiMappers";
import { formatRupiah } from "../../data/seeder";

function TransactionReports() {
  const { fetchLaporan } = useAppData();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate]     = useState("");
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading]       = useState(false);

  useEffect(() => {
    if (!startDate || !endDate) return;
    setLoading(true);
    fetchLaporan(startDate, endDate)
      .then((res) => setReportData(res))
      .catch(() => setReportData(null))
      .finally(() => setLoading(false));
  }, [startDate, endDate, fetchLaporan]);

  const filteredBookings = useMemo(() => {
    if (!reportData?.transaksi) return [];
    return reportData.transaksi.map(mapBookingFromApi);
  }, [reportData]);

  const stats = useMemo(() => ({
    totalRevenue:      reportData?.total ?? 0,
    successfulRevenue: filteredBookings
      .filter((b) => b.paymentStatus === "DP Sudah Dibayar" || b.paymentStatus === "Lunas")
      .reduce((sum, b) => sum + b.totalPrice, 0),
    totalTransactions: filteredBookings.length,
  }), [filteredBookings, reportData]);

  const handleExportCSV = () => {
    let csv = "No,ID Transaksi,Pelanggan,Lapangan,Tanggal,Durasi,Total Harga,DP,Sisa Bayar,Status Pembayaran,Status Booking\n";
    filteredBookings.forEach((booking, idx) => {
      csv += `${idx + 1},"${booking.bookingCode}","${booking.customerName}","${booking.fieldName}","${booking.date}","${booking.duration} Jam",${booking.totalPrice},${booking.downPayment},${booking.remainingPayment},"${booking.paymentStatus}","${booking.bookingStatus}"\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "laporan_transaksi.csv";
    link.click();
  };

  const metricCards = [
    {
      label: "Total Pendapatan Periode",
      value: formatRupiah(stats.totalRevenue),
      accent: "#F0A500",
      bg: "rgba(240,165,0,0.08)",
      border: "rgba(240,165,0,0.15)",
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "Pendapatan Terverifikasi",
      value: formatRupiah(stats.successfulRevenue),
      accent: "#34D399",
      bg: "rgba(52,211,153,0.08)",
      border: "rgba(52,211,153,0.15)",
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "Total Transaksi",
      value: stats.totalTransactions,
      accent: "#60A5FA",
      bg: "rgba(96,165,250,0.08)",
      border: "rgba(96,165,250,0.15)",
      icon: (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Page header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold">Owner Panel</p>
        <h1 className="text-2xl font-black text-white" style={{ fontFamily: "Plus Jakarta Sans" }}>
          Laporan Transaksi
        </h1>
        <p className="mt-0.5 text-sm text-slate-400">Analisis pendapatan berdasarkan periode waktu</p>
      </div>

      {/* Filter card */}
      <div className="rounded-2xl p-5" style={{ background: "#141B28", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="mb-4 flex items-center gap-2">
          <svg className="h-4 w-4 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
          <p className="text-sm font-semibold text-white">Filter Periode Laporan</p>
          <span className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold text-slate-500"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            UC-10
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Start Date */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Tanggal Mulai
            </label>
            <div className="flex items-center gap-2 rounded-xl px-4 py-3 transition-all duration-200"
                 style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <svg className="h-4 w-4 shrink-0 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="flex-1 bg-transparent text-sm text-white outline-none [color-scheme:dark]"
              />
            </div>
          </div>

          {/* End Date */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Tanggal Selesai
            </label>
            <div className="flex items-center gap-2 rounded-xl px-4 py-3 transition-all duration-200"
                 style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <svg className="h-4 w-4 shrink-0 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="flex-1 bg-transparent text-sm text-white outline-none [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Reset */}
          <div className="flex items-end">
            <button
              onClick={() => { setStartDate(""); setEndDate(""); setReportData(null); }}
              className="btn-ghost w-full py-3"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset Filter
            </button>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="grid gap-4 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="skeleton h-28 rounded-2xl" />
          ))}
        </div>
      )}

      {/* Metric cards */}
      {!loading && (
        <div className="grid gap-4 md:grid-cols-3">
          {metricCards.map((card) => (
            <div key={card.label}
              className="group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #141B28, #0F1520)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-2xl"
                   style={{ background: `radial-gradient(ellipse at top right, ${card.bg}, transparent 70%)` }} />
              <div className="relative flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{card.label}</p>
                  <p className="mt-2 text-2xl font-black" style={{ color: card.accent, fontFamily: "Plus Jakarta Sans" }}>
                    {card.value}
                  </p>
                  {(!startDate || !endDate) && (
                    <p className="mt-1 text-xs text-slate-600">Pilih periode untuk melihat data</p>
                  )}
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                     style={{ background: card.bg, border: `1px solid ${card.border}`, color: card.accent }}>
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table */}
      {!loading && (
        <div className="overflow-hidden rounded-2xl" style={{ background: "#141B28", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div>
              <h3 className="font-bold text-white" style={{ fontFamily: "Plus Jakarta Sans" }}>Detail Transaksi</h3>
              <p className="text-xs text-slate-500">
                {startDate && endDate ? `${startDate} – ${endDate}` : "Pilih periode terlebih dahulu"}
              </p>
            </div>
            {filteredBookings.length > 0 && (
              <span className="badge-blue">{filteredBookings.length} transaksi</span>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="data-table min-w-[1100px]">
              <thead>
                <tr>
                  {["No", "ID Transaksi", "Pelanggan", "Lapangan", "Tanggal", "Durasi", "Total", "DP", "Sisa", "Pembayaran", "Booking"].map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={11}>
                      <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl"
                             style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                          📊
                        </div>
                        <p className="text-sm font-semibold text-white">Tidak ada data</p>
                        <p className="mt-1 text-xs text-slate-500">
                          {startDate && endDate
                            ? "Tidak ada transaksi untuk periode ini."
                            : "Pilih tanggal mulai dan selesai untuk melihat laporan."}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking, idx) => (
                    <tr key={booking.id}>
                      <td><span className="text-slate-600">{idx + 1}</span></td>
                      <td><span className="font-mono text-xs font-bold text-brand-gold">{booking.bookingCode}</span></td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="avatar-gold h-7 w-7 shrink-0 rounded-lg text-xs">
                            {booking.customerName?.charAt(0)}
                          </div>
                          <span>{booking.customerName}</span>
                        </div>
                      </td>
                      <td>{booking.fieldName}</td>
                      <td><span className="text-xs text-slate-400">{booking.date}</span></td>
                      <td><span className="badge-gray">{booking.duration} Jam</span></td>
                      <td><span className="font-semibold text-brand-gold">{formatRupiah(booking.totalPrice)}</span></td>
                      <td>{formatRupiah(booking.downPayment)}</td>
                      <td>{formatRupiah(booking.remainingPayment)}</td>
                      <td><StatusBadge status={booking.paymentStatus} /></td>
                      <td><StatusBadge status={booking.bookingStatus} /></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Export buttons */}
      <div className="flex justify-end gap-3 print:hidden">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200"
          style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#F87171" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.1)"; }}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Ekspor ke PDF
        </button>
        <button
          onClick={handleExportCSV}
          disabled={filteredBookings.length === 0}
          className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 disabled:opacity-40"
          style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)", color: "#34D399" }}
          onMouseEnter={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.background = "rgba(52,211,153,0.15)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(52,211,153,0.1)"; }}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Ekspor ke Excel
        </button>
      </div>
    </div>
  );
}

export default TransactionReports;
