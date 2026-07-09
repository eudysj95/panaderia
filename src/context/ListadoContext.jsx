import { createContext, useState, useEffect } from "react";
import { API_BASE_URL } from "../config";

const STORAGE_KEY = "panaderia-exchange-rate";

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

export const ListadoContext = createContext(null);

export function ListadoProvider({ children }) {
  const [data, setData] = useState({ panes: [], viveres: [], mayor: [] });
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(getInitialRate);

  // Fetch all data on mount with unmount protection
  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const categories = ["panes", "viveres", "mayor"];
        const urls = [
          `${API_BASE_URL}/products?category=panes`,
          `${API_BASE_URL}/products?category=viveres`,
          `${API_BASE_URL}/products?category=mayor`,
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

        if (!cancelled) {
          setData({
            panes: panes.map(mapProduct),
            viveres: viveres.map(mapProduct),
            mayor: mayor.map(mapProduct),
          });

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
        }
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
  }, []);

  const updateExchangeRate = (rate) => {
    const value = parseFloat(rate);
    if (isNaN(value) || value <= 0) return;

    // Optimistic local update
    setExchangeRate(value);
    try {
      localStorage.setItem(STORAGE_KEY, value.toString());
    } catch {
      // localStorage unavailable
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
      }}
    >
      {children}
    </ListadoContext.Provider>
  );
}
