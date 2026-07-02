const sizeMap = {
  xs: { img: "h-8 w-8", title: "text-sm", subtitle: "text-[10px]" },
  sm: { img: "h-10 w-10", title: "text-base", subtitle: "text-xs" },
  md: { img: "h-12 w-12", title: "text-lg", subtitle: "text-xs" },
  lg: { img: "h-20 w-20", title: "text-2xl", subtitle: "text-sm" },
  xl: { img: "h-28 w-28", title: "text-3xl", subtitle: "text-sm" },
};

function AppLogo({ size = "md", showText = true, className = "", textClassName = "" }) {
  const s = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src="/images/logo.png"
        alt="Triple A Minisoccer"
        className={`${s.img} shrink-0 rounded-full object-cover object-center shadow-md ring-2 ring-brand-gold/40`}
      />
      {showText && (
        <div className={textClassName}>
          <p className={`${s.title} font-black leading-tight text-brand-gold`}>Triple A</p>
          <p className={`${s.subtitle} font-semibold text-gray-400`}>Minisoccer</p>
        </div>
      )}
    </div>
  );
}

export default AppLogo;
