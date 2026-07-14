import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ListadoContext } from "../context/ListadoContext";
import { useProductCrud } from "../hooks/useProductCrud";
import { SearchBar } from "./SearchBar";
import { ProductGrid } from "./ProductGrid";
import { ProductModal } from "./ProductModal";
import { ConfirmDialog } from "./ConfirmDialog";
import { SkeletonLoader } from "./SkeletonLoader";
import { Toast } from "./Toast";

/**
 * Replaces Marco.jsx — composes SearchBar, ProductGrid, ProductModal, ConfirmDialog,
 * SkeletonLoader, and EmptyState. Manages client-side search filtering.
 *
 * Props match the old Marco interface exactly (title, metodo, discount).
 */
export function ProductList({ title, metodo, discount = 0 }) {
  const {
    data,
    loading,
    error,
    exchangeRate,
    refreshData,
  } = useContext(ListadoContext);

  const [listado, setListado] = useState([]);
  const [busquedaState, setBusquedaState] = useState("");

  // CRUD state machine extracted to hook
  const {
    showModal,
    setShowModal,
    editItem,
    setEditItem,
    deleteItem,
    setDeleteItem,
    mutationError,
    clearError,
    handleAdd,
    handleEdit,
    handleDelete,
    openAdd,
    openEdit,
    openDelete,
  } = useProductCrud("product", listado, refreshData);

  // Map + filter items whenever data or search changes
  useEffect(() => {
    if (!data) return;

    const rawData = data[metodo];
    if (!rawData) return;

    const mapped = rawData.map((dato) => ({
      ...dato,
      precio: parseFloat(dato.precio),
    }));

    if (busquedaState.length === 0) {
      setListado(mapped);
      return;
    }

    const filtered = mapped.filter((item) =>
      item.producto.toLowerCase().includes(busquedaState.toLowerCase())
    );

    setListado(filtered);
  }, [busquedaState, data, metodo]);

  const buscar = (e) => setBusquedaState(e);

  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <SkeletonLoader count={4} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <span className="text-5xl mb-4">😅</span>
          <p className="text-[var(--color-error)] text-lg font-medium mb-2">
            Error al cargar productos: {error}
          </p>
          <button
            onClick={refreshData}
            className="mt-4 px-6 py-2 rounded-xl bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary)]/90 active:scale-[0.98] transition-all min-h-[44px]"
            type="button"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* Search + Add */}
      <div className="flex items-center gap-2 mb-4">
        <SearchBar value={busquedaState} onChange={buscar} placeholder="Busca un producto" />
        <button
          onClick={openAdd}
          className="text-sm px-3 py-1 rounded-xl bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent)]/80 transition-colors whitespace-nowrap min-h-[44px] font-medium"
          type="button"
        >
          + Agregar
        </button>
      </div>

      {/* Product Grid */}
      <ProductGrid
        items={listado}
        exchangeRate={exchangeRate}
        metodo={metodo}
        discount={discount}
        onEdit={openEdit}
        onDelete={openDelete}
      />

      {/* Add/Edit Modal */}
      <ProductModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditItem(null);
          clearError();
        }}
        onSave={editItem ? handleEdit : handleAdd}
        initialData={editItem}
        categories={metodo === "mayor" ? ["panes"] : ["panes", "viveres", "mayor"]}
      />

      {/* Error Toast */}
      {mutationError && (
        <Toast message={mutationError} type="error" onDismiss={clearError} />
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
        title="Eliminar Producto"
        message={
          deleteItem
            ? `¿Estás seguro de eliminar "${deleteItem.producto}"?`
            : ""
        }
      />
    </div>
  );
}

ProductList.propTypes = {
  title: PropTypes.string.isRequired,
  metodo: PropTypes.string.isRequired,
  discount: PropTypes.number,
};
