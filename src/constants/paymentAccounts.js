export const DP_PAYMENT_NOTE =
  "Sebelum melakukan pembayaran DP 50%, pastikan jadwal sudah benar. Transfer sesuai nominal DP ke salah satu rekening/e-wallet di bawah, lalu upload bukti pembayaran. Reservasi akan dikonfirmasi setelah admin memverifikasi bukti transfer.";

export const paymentAccounts = [
  {
    id: "gopay",
    name: "GoPay",
    shortLabel: "GP",
    accent: "bg-green-600 text-white",
    accountNumber: "0812-3456-7890",
    accountName: "Triple A Minisoccer",
    description: "Transfer DP 50% via GoPay.",
  },
  {
    id: "dana",
    name: "DANA",
    shortLabel: "DN",
    accent: "bg-blue-600 text-white",
    accountNumber: "0812-9876-5432",
    accountName: "Triple A Minisoccer",
    description: "Transfer DP 50% via DANA.",
  },
  {
    id: "transfer",
    name: "Transfer Bank BRI",
    shortLabel: "BRI",
    accent: "bg-brand-dark text-brand-gold border border-brand-gold",
    accountNumber: "1234567890",
    accountName: "Triple A Minisoccer",
    bankName: "BRI",
    description: "Transfer DP 50% ke rekening BRI.",
  },
];

export function getPaymentAccount(id) {
  return paymentAccounts.find((a) => a.id === id);
}

export function getPaymentAccountLabel(id) {
  return getPaymentAccount(id)?.name || "-";
}
