function StatCard({ title, value, icon, colorClass = "text-primary" }) {
  return (
    <div className="card rounded-box bg-base-100 shadow-sm">
      <div className="card-body p-5">
        <div className="mb-3 flex items-center gap-3">
          <div className={`${colorClass}`}>{icon}</div>
          <h3 className="text-sm font-medium text-base-content/70">{title}</h3>
        </div>
        <p className="text-3xl font-extrabold text-base-content">{value}</p>
      </div>
    </div>
  );
}

export default StatCard;
