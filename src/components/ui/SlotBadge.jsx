function SlotBadge({ colorClass, label }) {
  return (
    <div className="inline-flex items-center gap-2 text-xs text-gray-500">
      <span className={`h-3 w-3 rounded-full ${colorClass}`} />
      <span>{label}</span>
    </div>
  );
}

export default SlotBadge;
