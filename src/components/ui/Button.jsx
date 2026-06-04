const variantStyles = {
  primary: "bg-brand-gold text-brand-dark hover:bg-brand-goldLight",
  danger: "bg-red-600 text-white hover:bg-red-700",
  success: "bg-green-600 text-white hover:bg-green-700",
  warning: "bg-amber-400 text-brand-dark hover:bg-amber-500",
  dark: "bg-brand-dark text-white hover:bg-brand-gold hover:text-brand-dark",
  outline: "border border-gray-300 bg-white text-brand-dark hover:border-brand-gold",
};

function Button({
  label,
  variant = "primary",
  onClick,
  icon,
  fullWidth = false,
  className = "",
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${fullWidth ? "w-full" : ""} ${variantStyles[variant]} ${className}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

export default Button;
