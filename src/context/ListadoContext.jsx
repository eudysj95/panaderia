import { createContext, useState, useEffect, useCallback } from "react";
import { API_BASE_URL } from "../config";

const STORAGE_KEY = "panaderia-exchange-rate";
const API_KEY_STORAGE = "panaderia-api-key";

function getInitialRate() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = parseFloat(stored);
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
  } catch {
    // localStorage unavailable — fallback to 175
  }
  return 175;
}

function getStoredApiKey() {
  try {
    return localStorage.getItem(API_KEY_STORAGE) || "";
  } catch {
    return "";
  }
}

export const ListadoContext = createContext(null);

export function ListadoProvider({ children }) {
  const [data, setData] = useState({ panes: [], viveres: [], mayor: [] });
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(getInitialRate);
  const [apiKey, setApiKeyState] = useState(getStoredApiKey);

  const setApiKey = useCallback((key) => {
    setApiKeyState(key);
    try {
      if (key) {
        localStorage.setItem(API_KEY_STORAGE, key);
      } else {
        localStorage.removeItem(API_KEY_STORAGE);
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  const ensureApiKey = useCallback(() => {
    if (apiKey) return apiKey;
    const key = window.prompt("Ingrese la clave API:");
    if (key) {
      setApiKey(key);
      return key;
    }
    return null;
  }, [apiKey, setApiKey]);

  // Core fetch logic shared by initial load and refresh
  const doFetch = useCallback(async () => {
    const categories = ["panes", "viveres", "mayor"];
    const urls = [
      `${API_BASE_URL}/products?category=panes`,
      `${API_BASE_URL}/products?category=viveres`,
      `${API_BASE_URL}/products?category=panes`,
      `${API_BASE_URL}/materials`,
      `${API_BASE_URL}/config/exchange-rate`,
    ];

    const responses = await Promise.all(urls.map((u) => fetch(u)));

    for (const res of responses) {
      if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
      }
    }

    const [panes, viveres, mayor, materialsData, configData] =
      await Promise.all(responses.map((r) => r.json()));

    // Map server fields (nombre, _id) to frontend expectations (producto)
    const mapProduct = (p) => ({
      ...p,
      producto: p.nombre,
    });

    setData({
      panes: panes.map(mapProduct),
      viveres: viveres.map(mapProduct),
      mayor: mayor.map(mapProduct),
    });

    // Map materials: producto alias, id alias from _id
    setMaterials(
      materialsData.map((m) => ({
        ...m,
        producto: m.nombre,
        id: m._id,
      }))
    );

    // Sync exchange rate from server
    if (configData && typeof configData.rate === "number") {
      setExchangeRate(configData.rate);
      try {
        localStorage.setItem(STORAGE_KEY, configData.rate.toString());
      } catch {
        // localStorage unavailable
      }
    }
  }, []);

  // Fetch all data on mount with unmount protection
  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        await doFetch();
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, [doFetch]);

  // Refresh data on demand (no unmount protection — caller expects results)
  const refreshData = useCallback(async () => {
    setError(null);
    try {
      await doFetch();
    } catch (err) {
      setError(err.message);
    }
  }, [doFetch]);

  const updateExchangeRate = (rate) => {
    // Allow empty string while typing — don't update state yet
    if (rate === "") {
      setExchangeRate(0);
      return;
    }

    const value = parseFloat(rate);
    if (isNaN(value) || value < 0) return;

    // Optimistic local update
    setExchangeRate(value);
    try {
      localStorage.setItem(STORAGE_KEY, value.toString());
    } catch {
      // localStorage unavailable
    }

    // Best-effort server sync (only for valid positive values)
    if (value > 0) {
      fetch(`${API_BASE_URL}/config/exchange-rate`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rate: value }),
      }).catch(() => {
        // Silent fail — local update still applies
      });
    }
  };

  return (
    <ListadoContext.Provider
      value={{
        data,
        materials,
        loading,
        error,
        exchangeRate,
        updateExchangeRate,
        apiKey,
        setApiKey,
        ensureApiKey,
        refreshData,
      }}
    >
      {children}
    </ListadoContext.Provider>
  );
}
