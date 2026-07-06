import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ListadoContext } from "../context/ListadoContext";
import back from "../assets/icons/circle-back.svg";
import { ProductCard } from "./ProductCard";

export function Marco({ title, metodo }) {
  const { data, loading, error, exchangeRate, updateExchangeRate } =
    useContext(ListadoContext);
  const [listado, setListado] = useState([]);
  const [busquedaState, setBusquedaState] = useState("");

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

            <div className="flex items-center gap-1 text-sm">
              <span className="text-gray-300">Tasa:</span>
              <input
                type="number"
                step="1"
                min="1"
                value={exchangeRate}
                onChange={(e) => updateExchangeRate(e.target.value)}
                className="w-20 text-black p-1 rounded-sm text-center"
                aria-label="Tasa de cambio Bs/USD"
              />
              <span className="text-gray-300">Bs/USD</span>
            </div>
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
            const precioUSD = metodo === "viveres"
              ? (item.precio / item.unidades) * 1.2
              : item.precio;

            return (
              <ProductCard
                key={item.producto}
                producto={item.producto}
                precioUSD={precioUSD}
                precioBS={precioUSD * exchangeRate}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

Marco.propTypes = {
  title: PropTypes.string.isRequired,
  metodo: PropTypes.string.isRequired,
};
