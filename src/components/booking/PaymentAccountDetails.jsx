import { useState } from "react";
import { getPaymentAccount } from "../../constants/paymentAccounts";

function PaymentAccountDetails({ accountId, dark = false }) {
  const account = getPaymentAccount(accountId);
  const [copied, setCopied] = useState(false);

  if (!account) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(account.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className={`rounded-xl border p-4 ${
        dark ? "border-brand-gold/30 bg-brand-dark" : "border-brand-gold/40 bg-amber-50"
      }`}
    >
      <p className={`text-xs font-semibold uppercase tracking-wide ${dark ? "text-brand-gold" : "text-brand-dark"}`}>
        Detail Pembayaran — {account.name}
      </p>
      {account.bankName && (
        <p className={`mt-2 text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}>
          Bank: <span className={`font-semibold ${dark ? "text-white" : "text-brand-dark"}`}>{account.bankName}</span>
        </p>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <p className={`text-xl font-black tracking-wide ${dark ? "text-white" : "text-brand-dark"}`}>
          {account.accountNumber}
        </p>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-lg bg-brand-gold px-3 py-1 text-xs font-bold text-brand-dark transition hover:bg-brand-goldLight"
        >
          {copied ? "Tersalin!" : "Salin"}
        </button>
      </div>
      <p className={`mt-2 text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}>
        a.n. <span className="font-semibold">{account.accountName}</span>
      </p>
      <p className={`mt-2 text-xs ${dark ? "text-gray-500" : "text-gray-500"}`}>{account.description}</p>
    </div>
  );
}

export default PaymentAccountDetails;
