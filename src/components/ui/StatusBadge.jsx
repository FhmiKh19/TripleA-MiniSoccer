const statusClassMap = {
  disetujui: "bg-green-500/20 text-green-400",
  aktif: "bg-green-500/20 text-green-400",
  tersedia: "bg-green-500/20 text-green-400",
  lunas: "bg-green-500/20 text-green-400",
  selesai: "bg-green-500/20 text-green-400",
  dijadwalkan: "bg-blue-500/20 text-blue-400",
  dikonfirmasi: "bg-blue-500/20 text-blue-400",
  "reservasi aktif": "bg-blue-500/20 text-blue-400",
  "menunggu konfirmasi pembatalan": "bg-orange-500/20 text-orange-400",
  "dp sudah dibayar": "bg-blue-500/20 text-blue-400",
  "dp terbayar": "bg-blue-500/20 text-blue-400",
  "menunggu verifikasi dp": "bg-amber-500/20 text-amber-400",
  pending: "bg-amber-500/20 text-amber-400",
  "menunggu pembayaran": "bg-amber-500/20 text-amber-400",
  ditolak: "bg-red-500/20 text-red-400",
  dibatalkan: "border border-red-500/50 bg-transparent text-red-400",
  dipesan: "bg-red-500/20 text-red-400",
  maintenance: "bg-gray-500/20 text-gray-400",
};

function StatusBadge({ status }) {
  const normalized = status.toLowerCase();
  const className = statusClassMap[normalized] || "bg-gray-500/20 text-gray-400";

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}>
      {status}
    </span>
  );
}

export default StatusBadge;
