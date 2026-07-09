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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-black rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Editar Producto" : "Agregar Producto"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Precio (USD)</label>
            <input
              type="number"
              step="0.001"
              min="0"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Categoría</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-md p-2"
            >
              {(categories || ["panes", "viveres", "mayor"]).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Unidades (solo para viveres)
            </label>
            <input
              type="number"
              step="1"
              min="0"
              value={unidades}
              onChange={(e) => setUnidades(e.target.value)}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
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
