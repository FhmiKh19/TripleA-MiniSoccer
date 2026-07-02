const statusMap = {
  // Green / success
  "lunas":                              { cls: "badge-green", dot: "#34D399", icon: "✓" },
  "selesai":                            { cls: "badge-green", dot: "#34D399", icon: "✓" },
  "disetujui":                          { cls: "badge-green", dot: "#34D399", icon: "✓" },
  "aktif":                              { cls: "badge-green", dot: "#34D399", icon: "●" },
  "tersedia":                           { cls: "badge-green", dot: "#34D399", icon: "●" },

  // Blue / info
  "dp sudah dibayar":                   { cls: "badge-blue", dot: "#60A5FA", icon: "✓" },
  "dp terbayar":                        { cls: "badge-blue", dot: "#60A5FA", icon: "✓" },
  "dikonfirmasi":                       { cls: "badge-blue", dot: "#60A5FA", icon: "●" },
  "dijadwalkan":                        { cls: "badge-blue", dot: "#60A5FA", icon: "●" },
  "reservasi aktif":                    { cls: "badge-blue", dot: "#60A5FA", icon: "●" },

  // Gold / warning
  "menunggu verifikasi dp":             { cls: "badge-gold", dot: "#F0A500", icon: "⏳" },
  "menunggu pembayaran":                { cls: "badge-gold", dot: "#F0A500", icon: "⏳" },
  "pending":                            { cls: "badge-gold", dot: "#F0A500", icon: "⏳" },
  "menunggu konfirmasi pembatalan":     { cls: "badge-gold", dot: "#F0A500", icon: "⏳" },

  // Red / error
  "ditolak":                            { cls: "badge-red", dot: "#F87171", icon: "✗" },
  "dibatalkan":                         { cls: "badge-red", dot: "#F87171", icon: "✗" },
  "dipesan":                            { cls: "badge-red", dot: "#F87171", icon: "●" },

  // Gray
  "maintenance":                        { cls: "badge-gray", dot: "#94A3B8", icon: "⚙" },
};

function StatusBadge({ status }) {
  if (!status) return null;
  const key = status.toLowerCase();
  const cfg = statusMap[key] || { cls: "badge-gray", dot: "#94A3B8", icon: "●" };

  return (
    <span className={cfg.cls} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
      <span style={{ color: cfg.dot, fontSize: '8px' }}>●</span>
      {status}
    </span>
  );
}

export default StatusBadge;
