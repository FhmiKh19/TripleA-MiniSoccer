const variantStyles = {
  primary: "btn-primary",
  danger: "btn-error",
  success: "btn-success",
  warning: "btn-warning",
  dark: "btn-secondary",
  outline: "btn-outline",
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
      className={`btn ${variantStyles[variant] || "btn-primary"} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

export default Button;
