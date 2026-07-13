import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ListadoContext } from "../context/ListadoContext";
import shopping from "../assets/icons/shopping-solid.svg";
import truck from "../assets/icons/truck-solid.svg";
import store from "../assets/icons/store-solid.svg";

export const Inicio = () => {
  const { exchangeRate, updateExchangeRate } = useContext(ListadoContext);

  return (
    <div className="w-screen text-center">
      <h1 className="bg-dark-surface border-b border-dark-border w-screen h-40 leading-[160px] font-bold text-3xl text-white">Panadería</h1>


        <span className="text-white font-medium text-xl">Tasa: </span>
        <input
          type="number"
          step="1"
          min="1"
          value={exchangeRate}
          onChange={(e) => updateExchangeRate(e.target.value)}
          className="w-20 text-center bg-dark-surface text-white border border-dark-border rounded px-2 py-1 focus:outline-none focus:border-accent transition-colors"
          aria-label="Tasa de cambio Bs/USD"
        />
        <span className="text-muted">  Bs/USD</span>


      <div className="w-full my-0 mx-auto grid grid-cols-1 sm:grid-cols-2 justify-items-center">
        <NavLink to="/viveres" className="text-2xl font-semibold text-white w-full bg-dark-surface border border-dark-border h-60 my-0 mx-auto p-2 flex flex-col justify-center items-center hover:border-accent hover:bg-dark-surface/80 transition-all"><img className="mb-2 w-10" src={shopping} alt="" />Precio de Víveres</NavLink>
        <NavLink to="/panaderia" className="text-2xl font-semibold text-white w-full bg-dark-surface border border-dark-border h-60 my-0 mx-auto p-2 flex flex-col justify-center items-center hover:border-accent hover:bg-dark-surface/80 transition-all"><img className="mb-2 w-10" src={store} alt="" />Precio de panadería</NavLink>
        <NavLink to="/mayor" className="text-2xl font-semibold text-white w-full bg-dark-surface border border-dark-border h-60 my-0 mx-auto p-2 flex flex-col justify-center items-center hover:border-accent hover:bg-dark-surface/80 transition-all"><img className="mb-2 w-10" src={truck} alt="" />Precios al mayor</NavLink>
        <NavLink to="/produccion" className="text-2xl font-semibold text-white w-full bg-dark-surface border border-dark-border h-60 my-0 mx-auto p-2 flex flex-col justify-center items-center hover:border-accent hover:bg-dark-surface/80 transition-all"><img className="mb-2 w-10" src={store} alt="" />Producción</NavLink>
      </div>
    </div>
  );
};
