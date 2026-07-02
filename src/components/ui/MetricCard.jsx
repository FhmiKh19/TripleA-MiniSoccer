function MetricCard({ title, value, subtitle, icon, accent = "gold" }) {
  const config = {
    gold:  { color: "#F0A500", bg: "rgba(240,165,0,0.08)",   border: "rgba(240,165,0,0.15)"  },
    green: { color: "#34D399", bg: "rgba(52,211,153,0.08)",  border: "rgba(52,211,153,0.15)" },
    blue:  { color: "#60A5FA", bg: "rgba(96,165,250,0.08)",  border: "rgba(96,165,250,0.15)" },
    white: { color: "#E2E8F0", bg: "rgba(226,232,240,0.05)", border: "rgba(226,232,240,0.1)" },
    red:   { color: "#F87171", bg: "rgba(248,113,113,0.08)", border: "rgba(248,113,113,0.15)" },
  }[accent] || { color: "#F0A500", bg: "rgba(240,165,0,0.08)", border: "rgba(240,165,0,0.15)" };

  return (
    <div className="group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1"
      style={{
        background: 'linear-gradient(135deg, #141B28, #0F1520)',
        border: `1px solid rgba(255,255,255,0.06)`,
      }}
    >
      {/* Background glow on hover */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-2xl"
           style={{ background: `radial-gradient(ellipse at top right, ${config.bg}, transparent 70%)` }} />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-black md:text-3xl truncate"
             style={{ color: config.color, fontFamily: 'Plus Jakarta Sans' }}>
            {value}
          </p>
          {subtitle && <p className="mt-1.5 text-xs text-slate-500">{subtitle}</p>}
        </div>
        {icon && (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
               style={{ background: config.bg, border: `1px solid ${config.border}`, color: config.color }}>
            {icon}
          </div>
        )}
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
           style={{ background: `linear-gradient(90deg, transparent, ${config.color}60, transparent)` }} />
    </div>
  );
}

export default MetricCard;
