function PaymentStatusCard({ isSuccess, statusMessage }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-brand-dark">Status</h2>
      <div
        className={`mt-3 rounded-xl border p-4 ${
          isSuccess ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"
        }`}
      >
        <p className="text-sm text-gray-500">{isSuccess ? "Berhasil" : "Menunggu"}</p>
        <p
          className={`mt-2 font-bold ${isSuccess ? "text-green-700" : "text-brand-dark"}`}
        >
          {statusMessage}
        </p>
      </div>
    </div>
  );
}

export default PaymentStatusCard;
