import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ListadoContext } from "../context/ListadoContext";
import { API_BASE_URL } from "../config";
import back from "../assets/icons/circle-back.svg";
import { MaterialModal } from "../components/MaterialModal";
import { ConfirmDialog } from "../components/ConfirmDialog";

export const Produccion = () => {
  const {
    materials,
    exchangeRate,
    loading,
    error,
    ensureApiKey,
    setApiKey,
    refreshData,
  } = useContext(ListadoContext);
  const [ingredientes, setIngredientes] = useState({});
  const [costBreakdown, setCostBreakdown] = useState(null);

  // CRUD state
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [mutationError, setMutationError] = useState(null);

  const handleInputChange = (e, id) => {
    setIngredientes((prev) => ({
      ...prev,
      [id]: e.target.value,
    }));
  };

  const mutationFetch = async (url, options) => {
    const key = ensureApiKey();
    if (!key) throw new Error("API key requerida");

    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": key,
        ...options.headers,
      },
    });

    if (res.status === 401) {
      setApiKey("");
      throw new Error("Clave API inválida. Intente de nuevo.");
    }

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Error ${res.status}: ${text || res.statusText}`);
    }

    return res.json();
  };

  const handleAdd = async (payload) => {
    setMutationError(null);
    try {
      await mutationFetch(`${API_BASE_URL}/materials`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setShowModal(false);
      refreshData();
    } catch (err) {
      setMutationError(err.message);
    }
  };

  const handleEdit = async (payload) => {
    setMutationError(null);
    try {
      await mutationFetch(`${API_BASE_URL}/materials/${editItem._id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      setShowModal(false);
      setEditItem(null);
      refreshData();
    } catch (err) {
      setMutationError(err.message);
    }
  };

  const handleDelete = async () => {
    if (!deleteItem) return;
    setMutationError(null);
    try {
      await mutationFetch(`${API_BASE_URL}/materials/${deleteItem._id}`, {
        method: "DELETE",
      });
      setDeleteItem(null);
      refreshData();
    } catch (err) {
      setMutationError(err.message);
      setDeleteItem(null);
    }
  };

  const openAdd = () => {
    setEditItem(null);
    setMutationError(null);
    setShowModal(true);
  };

  const openEdit = (id) => {
    const item = materials.find((m) => m._id === id);
    if (item) {
      setEditItem(item);
      setMutationError(null);
      setShowModal(true);
    }
  };

  const openDelete = (id) => {
    const item = materials.find((m) => m._id === id);
    if (item) setDeleteItem(item);
  };

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center text-white">
        <div className="w-full flex justify-between items-center mb-4">
          <Link to="/">
            <img
              src={back}
              alt="back"
              className="w-12 bg-white rounded-[50%] mt-4"
            />
          </Link>
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold">Producción</h1>
          </div>
          <div className="w-12" />
        </div>
        <p className="text-lg text-gray-300 mt-16">
          Cargando materiales...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col items-center text-white">
        <div className="w-full flex justify-between items-center mb-4">
          <Link to="/">
            <img
              src={back}
              alt="back"
              className="w-12 bg-white rounded-[50%] mt-4"
            />
          </Link>
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold">Producción</h1>
          </div>
          <div className="w-12" />
        </div>
        <p className="text-lg text-red-400 mt-16">
          Error al cargar materiales: {error}
        </p>
      </div>
    );
  }

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
  };

  return (
    <div className="w-full flex flex-col items-center text-white">
      <div className="w-full flex justify-between items-center mb-4">
        <Link to="/">
          <img
            src={back}
            alt="back"
            className="w-12 bg-white rounded-[50%] mt-4"
          />
        </Link>

        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">Producción</h1>
        </div>

        <div className="flex gap-2 items-center">
          <button
            onClick={openAdd}
            type="button"
            className="bg-green-600 text-white px-3 py-2 rounded-md text-sm font-semibold hover:bg-green-700 transition-colors"
          >
            + Material
          </button>
          <button
            onClick={calcularCosto}
            name="costo"
            type="button"
            className="bg-white text-black px-4 py-2 rounded-md font-semibold hover:bg-gray-200 transition-colors"
          >
            Costo
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {materials.length === 0 ? (
          <p className="text-white text-lg col-span-full text-center">
            No hay materiales disponibles
          </p>
        ) : (
          materials.map((item) => {
            return (
              <article
                key={item.id}
                className="w-44 min-h-[9rem] text-veryDarkBlue mb-4 text-center border-2 shadow pt-1 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <h3 className="mt-2 text-base font-medium">
                    {item.producto}
                  </h3>
                  <p className="mt-2">{item.precio.toFixed(2)} $</p>
                  <input
                    className="w-20 rounded-md text-black mt-1"
                    type="number"
                    step="0.01"
                    name={item.producto}
                    value={ingredientes[item.id] ?? ""}
                    onChange={(e) => handleInputChange(e, item.id)}
                  />
                </div>
                <div className="flex justify-center gap-2 pb-2 mt-1">
                  <button
                    onClick={() => openEdit(item._id)}
                    className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                    type="button"
                    aria-label={`Editar ${item.producto}`}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => openDelete(item._id)}
                    className="text-xs px-2 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                    type="button"
                    aria-label={`Eliminar ${item.producto}`}
                  >
                    Eliminar
                  </button>
                </div>
              </article>
            );
          })
        )}
      </div>

      {costBreakdown && (
        <div className="w-full max-w-lg bg-white text-black rounded-lg p-4 mb-6">
          <h2 className="text-xl font-bold mb-3 text-center">
            Desglose de Costos
          </h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-2">Ingrediente</th>
                <th className="text-right py-2">Cantidad</th>
                <th className="text-right py-2">USD</th>
                <th className="text-right py-2">Bs</th>
              </tr>
            </thead>
            <tbody>
              {costBreakdown.breakdown.map((item) => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="py-1">{item.name}</td>
                  <td className="text-right py-1">
                    {item.weight > 0 ? item.weight.toFixed(2) : "—"}
                  </td>
                  <td className="text-right py-1">
                    ${item.subtotal.toFixed(2)}
                  </td>
                  <td className="text-right py-1">
                    Bs {(item.subtotal * exchangeRate).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-bold border-t-2 border-gray-300">
                <td className="py-2" colSpan={2}>
                  Total
                </td>
                <td className="text-right py-2">
                  ${costBreakdown.total.toFixed(2)}
                </td>
                <td className="text-right py-2">
                  Bs {(costBreakdown.total * exchangeRate).toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      <MaterialModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditItem(null);
          setMutationError(null);
        }}
        onSave={editItem ? handleEdit : handleAdd}
        initialData={editItem}
      />

      {mutationError && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {mutationError}
          <button
            onClick={() => setMutationError(null)}
            className="ml-3 text-white font-bold"
            type="button"
          >
            ✕
          </button>
        </div>
      )}

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
