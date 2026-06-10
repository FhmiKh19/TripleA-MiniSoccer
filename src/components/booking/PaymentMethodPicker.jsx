import { formatRupiah } from "../../data/seeder";

export const mockPaymentMethods = [
  { id: "qris", name: "QRIS", shortLabel: "QR", accent: "bg-brand-gold text-brand-dark" },
  { id: "gopay", name: "GoPay", shortLabel: "GP", accent: "bg-green-600 text-white" },
  { id: "transfer", name: "Transfer Bank", shortLabel: "TF", accent: "bg-brand-dark text-brand-gold border border-brand-gold" },
];

function PaymentMethodPicker({ selectedMethod, onSelect, dpAmount, dark = false }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {mockPaymentMethods.map((method) => {
        const active = selectedMethod === method.id;
        return (
          <button
            key={method.id}
            type="button"
            onClick={() => onSelect(method.id)}
            className={`relative rounded-xl border p-4 text-left transition-all duration-200 ${
              active
                ? "border-brand-gold bg-brand-gold/10"
                : dark
                ? "border-brand-border bg-brand-card hover:border-brand-gold"
                : "border-gray-200 hover:border-brand-gold"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-black ${method.accent}`}
              >
                {method.shortLabel}
              </span>
              <div>
                <p className={`font-bold ${dark ? "text-white" : "text-brand-dark"}`}>
                  {method.name}
                </p>
                <p className="text-xs text-gray-500">DP {formatRupiah(dpAmount)}</p>
              </div>
            </div>
            {active && (
              <span className="absolute right-3 top-3 text-xs font-bold text-brand-gold">
                Dipilih
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function getPaymentMethodLabel(methodId) {
  return mockPaymentMethods.find((m) => m.id === methodId)?.name || "-";
}

export default PaymentMethodPicker;
