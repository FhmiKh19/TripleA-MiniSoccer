const statusClassMap = {
  disetujui: "badge-success",
  aktif: "badge-success",
  tersedia: "badge-success",
  lunas: "badge-success",
  selesai: "badge-success",
  dijadwalkan: "badge-info",
  dikonfirmasi: "badge-info",
  "reservasi aktif": "badge-info",
  "menunggu konfirmasi pembatalan": "badge-warning",
  "dp sudah dibayar": "badge-info",
  "dp terbayar": "badge-info",
  "menunggu verifikasi dp": "badge-warning",
  pending: "badge-warning",
  "menunggu pembayaran": "badge-warning",
  ditolak: "badge-error",
  dibatalkan: "badge-outline badge-error",
  dipesan: "badge-error",
  maintenance: "badge-secondary",
};

function StatusBadge({ status }) {
  const normalized = status.toLowerCase();
  const className = statusClassMap[normalized] || "badge badge-outline badge-info";

  return (
    <span className={`badge ${className} text-sm font-semibold`}>
      {status}
    </span>
  );
}

export default StatusBadge;
