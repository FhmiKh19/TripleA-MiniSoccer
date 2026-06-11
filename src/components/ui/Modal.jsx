function Modal({ open, onClose, title, children, size = "lg" }) {
  if (!open) return null;

  const sizeClass = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  }[size];

  return (
    <div className="modal modal-open fixed inset-0 z-50 overflow-y-auto bg-black/50 p-4">
      <div className={`modal-box relative mx-auto w-full ${sizeClass}`}>
        {title && (
          <div className="mb-4 flex items-start justify-between gap-4">
            <h3 className="text-xl font-bold">{title}</h3>
            <button type="button" onClick={onClose} className="btn-sm btn-circle btn">✕</button>
          </div>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
