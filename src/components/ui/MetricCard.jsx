function MetricCard({ title, value, subtitle, icon, accent = "gold" }) {
  const accentClass = {
    gold: "text-primary",
    white: "text-base-content",
    green: "text-success",
  }[accent] || "text-primary";

  return (
    <div className="card rounded-box bg-base-100 shadow-md">
      <div className="card-body p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-base-content/70">{title}</p>
            <p className={`mt-2 text-2xl font-bold md:text-3xl ${accentClass}`}>{value}</p>
            {subtitle && <p className="mt-1 text-xs text-base-content/60">{subtitle}</p>}
          </div>
          {icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              {icon}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MetricCard;
