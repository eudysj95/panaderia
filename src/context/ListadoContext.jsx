import { createContext, useState, useEffect } from "react";
import dataPanes from "../assets/dataPanes.json";
import dataViveres from "../assets/dataViveres.json";
import dataMayor from "../assets/dataMayor.json";

export const ListadoContext = createContext(null);

export function ListadoProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setData({
          panes: dataPanes,
          viveres: dataViveres,
          mayor: dataMayor,
        });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <ListadoContext.Provider value={{ data, loading, error }}>
      {children}
    </ListadoContext.Provider>
  );
}
