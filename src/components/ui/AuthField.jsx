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
        <div className="relative border-b-2 border-gray-300 transition-colors focus-within:border-brand-gold">
          <input
            type={inputType}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            autoComplete={autoComplete}
            className="auth-input pr-10"
          />
          <button
            type="button"
            tabIndex={-1}
            onClick={onToggle}
            className="absolute right-0 top-0 flex h-full items-center px-1 text-gray-500 hover:text-brand-gold"
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
        className="auth-input border-b-2 border-gray-300 focus:border-brand-gold"
      />
    </div>
  );
}

export default AuthField;
