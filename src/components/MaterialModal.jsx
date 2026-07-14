import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { BottomSheet } from "./BottomSheet";

export function MaterialModal({ isOpen, onClose, onSave, initialData }) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setNombre(initialData.nombre || initialData.producto || "");
        setPrecio(initialData.precio?.toString() || "");
      } else {
        setNombre("");
        setPrecio("");
      }
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      nombre,
      precio: parseFloat(precio),
    });
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Editar Material" : "Agregar Material"}
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1 text-[var(--color-text-secondary)]">
            Nombre
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="w-full border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text-primary)] rounded-xl p-3 focus:outline-none focus:border-[var(--color-primary)] transition-colors"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-[var(--color-text-secondary)]">
            Precio (USD/kg)
          </label>
          <input
            type="number"
            step="0.001"
            min="0"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
            className="w-full border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text-primary)] rounded-xl p-3 focus:outline-none focus:border-[var(--color-primary)] transition-colors"
          />
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[var(--color-surface-alt)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:bg-[var(--color-border)] transition-colors min-h-[44px] font-medium"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)] transition-colors min-h-[44px] font-semibold"
          >
            {initialData ? "Guardar" : "Agregar"}
          </button>
        </div>
      </form>
    </BottomSheet>
  );
}

MaterialModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  initialData: PropTypes.object,
};
