import { useState, useContext, useCallback } from "react";
import { ListadoContext } from "../context/ListadoContext";
import { API_BASE_URL } from "../config";

/**
 * Generic CRUD hook for products and materials.
 * Preserves the exact mutation logic and modal state machine from Marco.jsx / Produccion.jsx.
 *
 * @param {'product' | 'material'} entityType - Determines the API endpoint (/products or /materials)
 * @param {Array} items - Current list of items (used to find item by id for edit/delete)
 * @param {function} onSuccess - Callback after successful mutation (typically refreshData)
 */
export function useProductCrud(entityType, items, onSuccess) {
  const { ensureApiKey, setApiKey } = useContext(ListadoContext);

  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [mutationError, setMutationError] = useState(null);

  const endpoint = entityType === "material" ? "materials" : "products";

  const mutationFetch = useCallback(
    async (url, options) => {
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
    },
    [ensureApiKey, setApiKey]
  );

  const handleAdd = useCallback(
    async (payload) => {
      setMutationError(null);
      try {
        await mutationFetch(`${API_BASE_URL}/${endpoint}`, {
          method: "POST",
          body: JSON.stringify(payload),
        });
        setShowModal(false);
        onSuccess?.();
      } catch (err) {
        setMutationError(err.message);
      }
    },
    [mutationFetch, endpoint, onSuccess]
  );

  const handleEdit = useCallback(
    async (payload) => {
      setMutationError(null);
      try {
        await mutationFetch(`${API_BASE_URL}/${endpoint}/${editItem._id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        setShowModal(false);
        setEditItem(null);
        onSuccess?.();
      } catch (err) {
        setMutationError(err.message);
      }
    },
    [mutationFetch, endpoint, editItem, onSuccess]
  );

  const handleDelete = useCallback(async () => {
    if (!deleteItem) return;
    setMutationError(null);
    try {
      await mutationFetch(`${API_BASE_URL}/${endpoint}/${deleteItem._id}`, {
        method: "DELETE",
      });
      setDeleteItem(null);
      onSuccess?.();
    } catch (err) {
      setMutationError(err.message);
      setDeleteItem(null);
    }
  }, [mutationFetch, endpoint, deleteItem, onSuccess]);

  const openAdd = useCallback(() => {
    setEditItem(null);
    setMutationError(null);
    setShowModal(true);
  }, []);

  const openEdit = useCallback(
    (id) => {
      const item = items?.find((p) => p._id === id);
      if (item) {
        setEditItem(item);
        setMutationError(null);
        setShowModal(true);
      }
    },
    [items]
  );

  const openDelete = useCallback(
    (id) => {
      const item = items?.find((p) => p._id === id);
      if (item) setDeleteItem(item);
    },
    [items]
  );

  const clearError = useCallback(() => setMutationError(null), []);

  return {
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
  };
}
