import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ListadoContext } from "../context/ListadoContext";
import { API_BASE_URL } from "../config";
import back from "../assets/icons/circle-back.svg";
import { ProductCard } from "./ProductCard";
import { ProductModal } from "./ProductModal";
import { ConfirmDialog } from "./ConfirmDialog";

export function Marco({ title, metodo, discount = 0 }) {
  const {
    data,
    loading,
    error,
    exchangeRate,
    apiKey,
    setApiKey,
    ensureApiKey,
    refreshData,
  } = useContext(ListadoContext);
  const [listado, setListado] = useState([]);
  const [busquedaState, setBusquedaState] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [mutationError, setMutationError] = useState(null);

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

  const buscar = (e) => {
    setBusquedaState(e.target.value);
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
      await mutationFetch(`${API_BASE_URL}/products`, {
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
      await mutationFetch(`${API_BASE_URL}/products/${editItem._id}`, {
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
      await mutationFetch(`${API_BASE_URL}/products/${deleteItem._id}`, {
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
    const item = listado.find((p) => p._id === id);
    if (item) {
      setEditItem(item);
      setMutationError(null);
      setShowModal(true);
    }
  };

  const openDelete = (id) => {
    const item = listado.find((p) => p._id === id);
    if (item) setDeleteItem(item);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center text-white">
        <div className="w-full flex justify-between items-start">
          <Link to="/">
            <img
              src={back}
              alt="back"
              className="w-12 bg-white rounded-[50%] mt-4"
            />
          </Link>
        </div>
        <div className="flex items-center justify-center mt-16">
          <p className="text-lg text-gray-300">Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center text-white">
        <div className="w-full flex justify-between items-start">
          <Link to="/">
            <img
              src={back}
              alt="back"
              className="w-12 bg-white rounded-[50%] mt-4"
            />
          </Link>
        </div>
        <div className="flex items-center justify-center mt-16">
          <p className="text-lg text-red-400">
            Error al cargar productos: {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-white">
      <div className="w-full flex justify-between items-start">
        <Link to="/">
          <img
            src={back}
            alt="back"
            className="w-12 bg-white rounded-[50%] mt-4"
          />
        </Link>

        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4">{title}</h1>

          <div className="flex items-center gap-2">
            <input
              onChange={buscar}
              className="text-black ring-2 w-40 p-2 rounded-sm"
              type="text"
              name="busqueda"
              placeholder="Busca un producto"
              aria-label="Buscar productos"
            />

            <button
              onClick={openAdd}
              className="text-sm px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 transition-colors whitespace-nowrap"
              type="button"
            >
              + Agregar
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap mt-6 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
        {listado.length === 0 ? (
          <p className="text-white text-lg col-span-full text-center">
            No se encontraron productos
          </p>
        ) : (
          listado.map((item) => {
            const basePrice =
              metodo === "viveres"
                ? (item.precio / item.unidades) * 1.2
                : item.precio;
            const precioUSD =
              metodo === "mayor"
                ? basePrice * (1 - discount / 100)
                : basePrice;
            const originalUSD =
              metodo === "mayor" ? basePrice : null;

            return (
              <ProductCard
                key={item._id}
                _id={item._id}
                producto={item.producto}
                precioUSD={precioUSD}
                precioBS={precioUSD * exchangeRate}
                originalUSD={originalUSD}
                originalBS={originalUSD != null ? originalUSD * exchangeRate : null}
                onEdit={openEdit}
                onDelete={openDelete}
              />
            );
          })
        )}
      </div>

      <ProductModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditItem(null);
          setMutationError(null);
        }}
        onSave={editItem ? handleEdit : handleAdd}
        initialData={editItem}
        categories={metodo === "mayor" ? ["panes"] : ["panes", "viveres", "mayor"]}
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

Marco.propTypes = {
  title: PropTypes.string.isRequired,
  metodo: PropTypes.string.isRequired,
  discount: PropTypes.number,
};
