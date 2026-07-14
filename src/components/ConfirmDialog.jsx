import PropTypes from "prop-types";
import { BottomSheet } from "./BottomSheet";

export function ConfirmDialog({ isOpen, onClose, onConfirm, title, message }) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title={title}>
      <p className="mb-6 text-[var(--color-text-secondary)] text-center">{message}</p>
      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-[var(--color-surface-alt)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:bg-[var(--color-border)] transition-colors min-h-[44px] font-medium"
          type="button"
        >
          Cancelar
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded-xl bg-[var(--color-error)] text-white hover:bg-[var(--color-error)]/90 transition-colors min-h-[44px] font-semibold"
          type="button"
        >
          Eliminar
        </button>
      </div>
    </BottomSheet>
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
