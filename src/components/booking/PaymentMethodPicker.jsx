import { formatRupiah } from "../../data/seeder";
import { paymentAccounts, getPaymentAccountLabel } from "../../constants/paymentAccounts";

export const mockPaymentMethods = paymentAccounts;

// Icon map per payment method
const methodIconMap = {
  gopay:       { emoji: "GP", color: "#00AED6", bg: "rgba(0,174,214,0.12)", border: "rgba(0,174,214,0.25)" },
  dana:        { emoji: "DN", color: "#2F80ED", bg: "rgba(47,128,237,0.12)", border: "rgba(47,128,237,0.25)" },
  bri:         { emoji: "BRI",color: "#F4811F", bg: "rgba(244,129,31,0.12)", border: "rgba(244,129,31,0.25)" },
  bca:         { emoji: "BCA",color: "#0066AE", bg: "rgba(0,102,174,0.12)", border: "rgba(0,102,174,0.25)" },
  mandiri:     { emoji: "MDR",color: "#006633", bg: "rgba(0,102,51,0.12)",  border: "rgba(0,102,51,0.25)" },
  ovo:         { emoji: "OVO",color: "#7B2BE2", bg: "rgba(123,43,226,0.12)",border: "rgba(123,43,226,0.25)" },
};

function PaymentMethodPicker({ selectedMethod, onSelect, dpAmount }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {paymentAccounts.map((method) => {
        const active = selectedMethod === method.id;
        const icon = methodIconMap[method.id] || { emoji: method.shortLabel, color: "#F0A500", bg: "rgba(240,165,0,0.12)", border: "rgba(240,165,0,0.25)" };

        return (
          <button
            key={method.id}
            type="button"
            onClick={() => onSelect(method.id)}
            className="relative rounded-2xl p-3.5 text-left transition-all duration-200"
            style={{
              background: active
                ? `linear-gradient(135deg, ${icon.bg}, rgba(255,255,255,0.02))`
                : "rgba(255,255,255,0.03)",
              border: `1px solid ${active ? icon.border : "rgba(255,255,255,0.06)"}`,
              boxShadow: active ? `0 0 20px ${icon.bg}` : "none",
            }}
          >
            {/* Active indicator */}
            {active && (
              <div
                className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black"
                style={{ background: "linear-gradient(135deg, #F0A500, #FFD166)", color: "#080C14" }}
              >
                ✓
              </div>
            )}

            <div className="flex items-center gap-3">
              {/* Icon */}
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-black"
                style={{ background: icon.bg, border: `1px solid ${icon.border}`, color: icon.color }}
              >
                {method.shortLabel}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white">{method.name}</p>
                <p className="text-xs text-slate-500">DP {formatRupiah(dpAmount)}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export function getPaymentMethodLabel(methodId) {
  return getPaymentAccountLabel(methodId);
}

export default PaymentMethodPicker;
