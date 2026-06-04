const statusClassMap = {
  disetujui: "bg-green-100 text-green-700",
  aktif: "bg-green-100 text-green-700",
  ditolak: "bg-red-100 text-red-700",
  dibatalkan: "border border-red-600 bg-transparent text-red-600",
  renovasi: "bg-red-100 text-red-700",
  "menunggu verifikasi": "bg-amber-100 text-amber-700",
  "menunggu pembayaran": "bg-amber-100 text-amber-700",
  "menunggu konfirmasi pembatalan": "bg-orange-100 text-orange-700",
};

function StatusBadge({ status }) {
  const normalized = status.toLowerCase();
  const className = statusClassMap[normalized] || "bg-gray-100 text-gray-700";

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}>
      {status}
    </span>
  );
}

export default StatusBadge;
