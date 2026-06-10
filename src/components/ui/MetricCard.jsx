function MetricCard({ title, value, subtitle, icon, accent = "gold" }) {
  const accentStyles = {
    gold: "border-brand-gold text-brand-gold",
    white: "border-white/20 text-white",
    green: "border-green-500 text-green-400",
  };

  return (
    <div className="premium-card border-l-4 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl" style={{ borderLeftColor: accent === "gold" ? "#C89B00" : undefined }}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className={`mt-2 text-2xl font-bold md:text-3xl ${accentStyles[accent]?.split(" ")[1] || "text-brand-gold"}`}>
            {value}
          </p>
          {subtitle && <p className="mt-1 text-xs text-gray-500">{subtitle}</p>}
        </div>
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

export default MetricCard;
