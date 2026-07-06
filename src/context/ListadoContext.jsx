import { createContext, useState, useEffect } from "react";
import dataPanes from "../assets/dataPanes.json";
import dataViveres from "../assets/dataViveres.json";
import dataMayor from "../assets/dataMayor.json";
import { EXCHANGE_RATE } from "../config";

const STORAGE_KEY = "panaderia-exchange-rate";

function getInitialRate() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = parseFloat(stored);
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
  } catch {
    // localStorage unavailable — fallback to config
  }
  return EXCHANGE_RATE;
}

export const ListadoContext = createContext(null);

export function ListadoProvider({ children }) {
  const [data] = useState({
    panes: dataPanes,
    viveres: dataViveres,
    mayor: dataMayor,
  });
  const [exchangeRate, setExchangeRate] = useState(getInitialRate);

  const updateExchangeRate = (rate) => {
    const value = parseFloat(rate);
    if (isNaN(value) || value <= 0) return;
    setExchangeRate(value);
    try {
      localStorage.setItem(STORAGE_KEY, value.toString());
    } catch {
      // localStorage unavailable
    }
  };

  return (
    <ListadoContext.Provider
      value={{ data, exchangeRate, updateExchangeRate }}
    >
      {children}
    </ListadoContext.Provider>
  );
}
