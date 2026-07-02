import { useEffect } from "react";

function Modal({ open, onClose, title, children, size = "lg", footer }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const maxWidthMap = {
    sm: "448px",
    md: "512px",
    lg: "672px",
    xl: "896px",
  };
  const maxW = maxWidthMap[size] || maxWidthMap.lg;

  return (
    /* Backdrop: full screen scroll container */
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{ background: "rgba(0,0,0,0.78)", backdropFilter: "blur(10px)" }}
    >
      {/* Centering wrapper */}
      <div
        className="flex min-h-full items-start justify-center p-4 sm:items-center sm:py-8"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {/* Modal box — flex column, internal scroll body */}
        <div
          className="animate-slide-up relative flex w-full flex-col"
          style={{
            maxWidth: maxW,
            maxHeight: "88vh",
            background: "linear-gradient(180deg, #141B28 0%, #0F1520 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "1.25rem",
            boxShadow: "0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(240,165,0,0.04)",
          }}
        >
          {/* ── STICKY HEADER ── */}
          {title && (
            <div
              className="flex shrink-0 items-center justify-between px-6 py-4"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                background: "#141B28",
                borderRadius: "1.25rem 1.25rem 0 0",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="h-[3px] w-6 rounded-full"
                     style={{ background: "linear-gradient(90deg, #F0A500, #FFD166)" }} />
                <h3 className="text-lg font-black text-white" style={{ fontFamily: "Plus Jakarta Sans" }}>
                  {title}
                </h3>
              </div>
              <button type="button" onClick={onClose}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-slate-400 transition-all hover:text-white"
                style={{ background: "rgba(255,255,255,0.04)" }}>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {/* ── SCROLLABLE BODY ── */}
          <div
            className="flex-1 overflow-y-auto px-6 py-5"
            style={{ overscrollBehavior: "contain" }}
          >
            {children}
          </div>

          {/* ── STICKY FOOTER ── */}
          {footer && (
            <div
              className="shrink-0 px-6 pb-5 pt-4"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                background: "#0F1520",
                borderRadius: "0 0 1.25rem 1.25rem",
              }}
            >
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
