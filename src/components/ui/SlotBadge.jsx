function SlotBadge({ colorClass, label }) {
  return (
    <span className={`badge badge-sm ${colorClass} border-0`}>{label}</span>
  );
}

export default SlotBadge;
