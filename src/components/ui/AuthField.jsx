function AuthField({
  label,
  type = "text",
  value,
  onChange,
  onKeyDown,
  placeholder,
  autoComplete,
  showToggle,
  onToggle,
  isVisible,
}) {
  const inputType = showToggle ? (isVisible ? "text" : "password") : type;

  if (showToggle) {
    return (
      <div>
        <label className="mb-1 block text-xs text-gray-500">{label}</label>
        <div className="relative">
          <input
            type={inputType}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            autoComplete={autoComplete}
            className="input input-bordered w-full pr-10"
          />
          <button
            type="button"
            tabIndex={-1}
            onClick={onToggle}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
            aria-label={isVisible ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
          >
            {isVisible ? "🙈" : "👁️"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <label className="mb-1 block text-xs text-gray-500">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="input input-bordered w-full"
      />
    </div>
  );
}

export default AuthField;
