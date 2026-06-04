function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="grid min-h-[85vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl md:grid-cols-[55%_45%]">
        <div className="relative hidden overflow-hidden rounded-r-3xl bg-brand-dark p-10 md:block">
          <div className="absolute -left-8 top-8 h-28 w-28 animate-bounce rounded-full bg-brand-gold/50" style={{ animationDuration: "4s" }} />
          <div className="absolute right-8 top-10 h-16 w-16 animate-bounce rounded-full bg-white/20" style={{ animationDuration: "5s" }} />
          <div className="absolute bottom-20 left-16 h-24 w-24 rounded-[40%] bg-brand-goldLight/40" />
          <div className="absolute right-20 top-1/3 h-12 w-12 rotate-12 bg-white/20" style={{ clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)" }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin text-[120px] drop-shadow-xl" style={{ animationDuration: "20s" }}>⚽</div>
          </div>
          <div className="absolute bottom-10 left-10 right-10 z-10">
            <h2 className="text-3xl font-black text-brand-gold">Triple A Minisoccer</h2>
            <p className="mt-2 text-sm text-gray-300">Pesan lapangan kapan saja, di mana saja.</p>
          </div>
        </div>
        <div className="flex items-center justify-center p-8">{children}</div>
      </div>
    </div>
  );
}

export default AuthLayout;
