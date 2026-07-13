import PropTypes from "prop-types";

export function ConfirmDialog({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-dark-surface text-white rounded-lg p-6 max-w-sm w-full mx-4 border border-dark-border">
        <h2 className="text-xl font-bold mb-3">{title}</h2>
        <p className="mb-6 text-muted">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-dark-border text-white hover:bg-dark-border/80 transition-colors min-h-[44px]"
            type="button"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-danger text-white hover:bg-danger/80 transition-colors min-h-[44px]"
            type="button"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

ConfirmDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
};

ConfirmDialog.defaultProps = {
  title: "Confirmar",
  message: "¿Estás seguro de que deseas eliminar este elemento?",
};
