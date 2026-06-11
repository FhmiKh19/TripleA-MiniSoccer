function PageHeader({ title, subtitle, action }) {
  return (
    <div className="mb-6 flex flex-col gap-3 rounded-box bg-base-200 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-base-content/70">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export default PageHeader;
