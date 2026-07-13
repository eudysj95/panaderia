import { useState, useEffect } from "react";
import PropTypes from "prop-types";

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

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      nombre,
      precio: parseFloat(precio),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-dark-surface text-white rounded-lg p-6 max-w-md w-full mx-4 border border-dark-border">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Editar Material" : "Agregar Material"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1 text-muted">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="w-full border border-dark-border bg-dark-bg text-white rounded-md p-2 focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-muted">
              Precio (USD/kg)
            </label>
            <input
              type="number"
              step="0.001"
              min="0"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
              className="w-full border border-dark-border bg-dark-bg text-white rounded-md p-2 focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-dark-border text-white hover:bg-dark-border/80 transition-colors min-h-[44px]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-accent text-white hover:bg-accent/80 transition-colors min-h-[44px]"
            >
              {initialData ? "Guardar" : "Agregar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

MaterialModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  initialData: PropTypes.object,
};
