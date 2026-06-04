function StatCard({ title, value, icon, colorClass = "text-brand-gold" }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-3">
        <div className={`${colorClass}`}>{icon}</div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      </div>
      <p className="text-3xl font-extrabold text-gray-900">{value}</p>
    </div>
  );
}

export default StatCard;
