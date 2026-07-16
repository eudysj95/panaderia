import { useState, useContext } from "react";
import { ListadoContext } from "../context/ListadoContext";
import { useProductCrud } from "../hooks/useProductCrud";
import { MaterialModal } from "../components/MaterialModal";
import { BottomSheet } from "../components/BottomSheet";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { SkeletonLoader } from "../components/SkeletonLoader";
import { EmptyState } from "../components/EmptyState";
import { Toast } from "../components/Toast";

export const Produccion = () => {
  const {
    materials,
    exchangeRate,
    loading,
    error,
    refreshData,
  } = useContext(ListadoContext);

  const [ingredientes, setIngredientes] = useState({});
  const [costBreakdown, setCostBreakdown] = useState(null);
  const [showCostSheet, setShowCostSheet] = useState(false);
  const [unidades, setUnidades] = useState(1);

  // CRUD state machine via shared hook
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
  } = useProductCrud("material", materials, refreshData);

  const handleInputChange = (e, id) => {
    const value = e.target.value;
    // If current value is "0" and user types a digit, replace "0" instead of appending
    if (ingredientes[id] === "0" && value.length > 1 && value.startsWith("0")) {
      setIngredientes((prev) => ({
        ...prev,
        [id]: value.slice(1),
      }));
    } else {
      setIngredientes((prev) => ({
        ...prev,
        [id]: value === "" ? "0" : value,
      }));
    }
  };

  const calcularCosto = () => {
    const breakdown = [];
    let total = 0;

    for (let i = 0; i < materials.length; i++) {
      const item = materials[i];
      const weight = parseFloat(ingredientes[item.id]) || 0;

      let subtotal = 0;
      if (weight > 0) {
        subtotal = item.precio * weight;
      }

      total += subtotal;
      breakdown.push({
        id: item.id,
        name: item.producto,
        weight: weight,
        subtotal: subtotal,
      });
    }

    setCostBreakdown({ breakdown, total });
    setShowCostSheet(true);
  };

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center">
        <SkeletonLoader count={4} />
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        emoji="😅"
        message={`Error al cargar materiales: ${error}`}
        onRetry={refreshData}
      />
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* Action buttons */}
      <div className="flex gap-2 items-center mb-4">
        <button
          onClick={openAdd}
          type="button"
          className="bg-[var(--color-accent)] text-white px-3 py-2 rounded-xl text-sm font-semibold hover:bg-[var(--color-accent)]/80 transition-colors min-h-[44px]"
        >
          + Material
        </button>
        <button
          onClick={calcularCosto}
          name="costo"
          type="button"
          className="bg-[var(--color-border)] text-[var(--color-text-primary)] px-4 py-2 rounded-xl font-semibold hover:bg-[var(--color-border)]/80 transition-colors min-h-[44px]"
        >
          Costo
        </button>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6 px-2 w-full max-w-5xl">
        {materials.length === 0 ? (
          <EmptyState emoji="📦" message="No hay materiales disponibles" />
        ) : (
          materials.map((item) => (
            <article
              key={item.id}
              className="w-full min-h-[9rem] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="p-4 text-center">
                <h3 className="mt-2 text-base font-semibold text-[var(--color-text-primary)]">
                  {item.producto}
                </h3>
                <p className="mt-2 text-[var(--color-text-primary)] font-semibold">
                  {item.precio.toFixed(2)} $
                </p>
                <input
                  className="w-20 rounded-xl text-[var(--color-text-primary)] bg-[var(--color-surface-alt)] border border-[var(--color-border)] mt-2 px-2 py-1 focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                  type="number"
                  step="0.01"
                  name={item.producto}
                  value={ingredientes[item.id] ?? ""}
                  onChange={(e) => handleInputChange(e, item.id)}
                />
              </div>
              <div className="flex justify-center gap-2 pb-3">
                <button
                  onClick={() => openEdit(item._id)}
                  className="text-xs px-3 py-1.5 rounded-xl bg-[var(--color-surface-alt)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:bg-[var(--color-border)] transition-colors min-h-[44px] font-medium"
                  type="button"
                  aria-label={`Editar ${item.producto}`}
                >
                  Editar
                </button>
                <button
                  onClick={() => openDelete(item._id)}
                  className="text-xs px-3 py-1.5 rounded-xl bg-[var(--color-error)]/10 text-[var(--color-error)] border border-[var(--color-error)]/20 hover:bg-[var(--color-error)]/20 transition-colors min-h-[44px] font-medium"
                  type="button"
                  aria-label={`Eliminar ${item.producto}`}
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Cost Breakdown BottomSheet */}
      <BottomSheet
        isOpen={showCostSheet}
        onClose={() => setShowCostSheet(false)}
        title="Desglose de Costos"
      >
        {costBreakdown && (
          <div>
            {/* Units input */}
            <div className="flex items-center justify-center gap-3 mb-4 p-3 bg-[var(--color-surface-alt)] rounded-xl">
              <label className="text-[var(--color-text-primary)] font-semibold">
                Unidades:
              </label>
              <input
                type="number"
                min="0"
                step="1"
                value={unidades || ""}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || val === "0") {
                    setUnidades(0);
                  } else {
                    setUnidades(parseInt(val) || 0);
                  }
                }}
                className="w-20 text-center rounded-xl text-[var(--color-text-primary)] bg-[var(--color-surface)] border border-[var(--color-border)] px-2 py-1 focus:outline-none focus:border-[var(--color-primary)] transition-colors"
              />
            </div>

            {/* Cost table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[480px]">
                <thead>
                  <tr className="border-b-2 border-[var(--color-border)]">
                    <th className="text-left py-2 text-[var(--color-text-secondary)]">Ingrediente</th>
                    <th className="text-right py-2 text-[var(--color-text-secondary)]">Cantidad</th>
                    <th className="text-right py-2 text-[var(--color-text-secondary)]">USD</th>
                    <th className="text-right py-2 text-[var(--color-text-secondary)]">Bs</th>
                  </tr>
                </thead>
                <tbody>
                  {costBreakdown.breakdown.map((item) => (
                    <tr key={item.id} className="border-b border-[var(--color-border)]">
                      <td className="py-1">{item.name}</td>
                      <td className="text-right py-1">
                        {item.weight > 0 ? item.weight.toFixed(2) : "—"}
                      </td>
                      <td className="text-right py-1">
                        ${item.subtotal.toFixed(2)}
                      </td>
                      <td className="text-right py-1 text-[var(--color-accent)]">
                        Bs {(item.subtotal * exchangeRate).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="mt-4 p-3 bg-[var(--color-surface-alt)] rounded-xl space-y-2">
              <div className="flex justify-between text-[var(--color-text-primary)]">
                <span className="font-semibold">Costo por unidad:</span>
                <span>${costBreakdown.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[var(--color-text-primary)] font-bold text-lg border-t border-[var(--color-border)] pt-2">
                <span>Total ({unidades} {unidades === 1 ? 'unidad' : 'unidades'}):</span>
                <span className="text-[var(--color-accent)]">
                  ${(costBreakdown.total * unidades).toFixed(2)} / Bs {(costBreakdown.total * unidades * exchangeRate).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}
      </BottomSheet>

      {/* Material Modal */}
      <MaterialModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditItem(null);
          clearError();
        }}
        onSave={editItem ? handleEdit : handleAdd}
        initialData={editItem}
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
        title="Eliminar Material"
        message={
          deleteItem
            ? `¿Estás seguro de eliminar "${deleteItem.producto}"?`
            : ""
        }
      />
    </div>
  );
};
