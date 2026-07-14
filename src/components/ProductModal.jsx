import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { BottomSheet } from "./BottomSheet";

export function ProductModal({ isOpen, onClose, onSave, initialData, categories }) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [category, setCategory] = useState(categories?.[0] || "panes");
  const [unidades, setUnidades] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setNombre(initialData.nombre || initialData.producto || "");
        setPrecio(initialData.precio?.toString() || "");
        setCategory(initialData.category || categories?.[0] || "panes");
        setUnidades(initialData.unidades?.toString() || "");
      } else {
        setNombre("");
        setPrecio("");
        setCategory(categories?.[0] || "panes");
        setUnidades("");
      }
    }
  }, [initialData, isOpen, categories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      nombre,
      precio: parseFloat(precio),
      category,
    };
    if (unidades && parseFloat(unidades) > 0) {
      payload.unidades = parseFloat(unidades);
    }
    onSave(payload);
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Editar Producto" : "Agregar Producto"}
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
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1 text-[var(--color-text-secondary)]">
            Precio (USD)
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
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1 text-[var(--color-text-secondary)]">
            Categoría
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text-primary)] rounded-xl p-3 focus:outline-none focus:border-[var(--color-primary)] transition-colors"
          >
            {(categories || ["panes", "viveres", "mayor"]).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-[var(--color-text-secondary)]">
            Unidades (solo para viveres)
          </label>
          <input
            type="number"
            step="1"
            min="0"
            value={unidades}
            onChange={(e) => setUnidades(e.target.value)}
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

ProductModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  categories: PropTypes.arrayOf(PropTypes.string),
};
