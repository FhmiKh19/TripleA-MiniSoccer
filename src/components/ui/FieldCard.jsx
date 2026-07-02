import { useNavigate } from "react-router-dom";
import { getStorageUrl } from "../../utils/storageUrl";
import fieldAImg from "../../assets/field_a.jpg";
import fieldBImg from "../../assets/field_b.jpg";

// Fallback image per field id / name
const fieldImageMap = {
  1: fieldAImg,
  2: fieldBImg,
};

function FieldCard({ field }) {
  const navigate = useNavigate();
  const backendImage = getStorageUrl(field.image);

  // Priority: backend image → fallback by id → fallback by index
  const imgSrc = backendImage || fieldImageMap[field.id] || fieldAImg;

  const isAvailable = field.status === "Tersedia" || !field.status;

  return (
    <article
      className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      style={{
        background: "linear-gradient(180deg, #141B28 0%, #0F1520 100%)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}
      onClick={() => navigate("/customer/booking-form", { state: { fieldId: field.id } })}
    >
      {/* ── IMAGE ── */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={imgSrc}
          alt={field.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { e.currentTarget.src = fieldAImg; }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0"
             style={{ background: "linear-gradient(to top, rgba(8,12,20,0.85) 0%, rgba(8,12,20,0.2) 50%, transparent 100%)" }} />

        {/* Status badge — top right */}
        <div className="absolute right-3 top-3">
          <span
            className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold backdrop-blur-sm"
            style={{
              background: isAvailable ? "rgba(52,211,153,0.2)" : "rgba(239,68,68,0.2)",
              border: `1px solid ${isAvailable ? "rgba(52,211,153,0.4)" : "rgba(239,68,68,0.4)"}`,
              color: isAvailable ? "#34D399" : "#F87171",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full"
                  style={{ background: isAvailable ? "#34D399" : "#F87171", animation: isAvailable ? "ping 2s infinite" : "none" }} />
            {isAvailable ? "Tersedia" : "Penuh"}
          </span>
        </div>

        {/* Bottom info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-black text-white" style={{ fontFamily: "Plus Jakarta Sans" }}>
            {field.name}
          </h3>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="p-5">
        <p className="text-xs leading-relaxed text-slate-500 line-clamp-2">
          {field.description || "Lapangan mini soccer premium dengan fasilitas lengkap dan lapangan berkualitas tinggi."}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-600">Mulai dari</p>
            <p className="mt-0.5 text-xl font-black text-brand-gold" style={{ fontFamily: "Plus Jakarta Sans" }}>
              {field.price}
            </p>
          </div>
          <div
            className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold transition-all duration-200 group-hover:gap-2.5"
            style={{
              background: "linear-gradient(135deg, rgba(240,165,0,0.15), rgba(240,165,0,0.06))",
              border: "1px solid rgba(240,165,0,0.2)",
              color: "#F0A500",
            }}
          >
            Pesan →
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="mt-4 h-0.5 overflow-hidden rounded-full"
             style={{ background: "rgba(255,255,255,0.04)" }}>
          <div className="h-full rounded-full transition-all duration-500 group-hover:w-full"
               style={{ width: "30%", background: "linear-gradient(90deg, #F0A500, #FFD166)" }} />
        </div>
      </div>
    </article>
  );
}

export default FieldCard;
