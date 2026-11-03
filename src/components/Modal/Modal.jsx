import "./modal.css";

function Modal({ onClose, children }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content" role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;