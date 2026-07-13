import { useState, useEffect } from "react";
import PropTypes from "prop-types";

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

  if (!isOpen) return null;

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
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-dark-surface text-white rounded-lg p-6 max-w-md w-full mx-4 border border-dark-border">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Editar Producto" : "Agregar Producto"}
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
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1 text-muted">Precio (USD)</label>
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
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1 text-muted">Categoría</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-dark-border bg-dark-bg text-white rounded-md p-2 focus:outline-none focus:border-accent transition-colors"
            >
              {(categories || ["panes", "viveres", "mayor"]).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-muted">
              Unidades (solo para viveres)
            </label>
            <input
              type="number"
              step="1"
              min="0"
              value={unidades}
              onChange={(e) => setUnidades(e.target.value)}
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

ProductModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  categories: PropTypes.arrayOf(PropTypes.string),
};
