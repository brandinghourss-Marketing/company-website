const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100000 bg-black/10" onClick={onClose}>
      {children}
    </div>
  );
};

export default Modal;
