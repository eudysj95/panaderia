import { NavLink } from "react-router-dom";
import shopping from "../assets/icons/shopping-solid.svg";
import truck from "../assets/icons/truck-solid.svg";
import store from "../assets/icons/store-solid.svg";

export const Inicio = () => {
  return (
    <div className="w-screen text-center">
      <h1 className="bg-brand-teal w-screen h-40 leading-[160px] font-bold text-3xl text-white">Panadería</h1>

      <div className="w-full my-0 mx-auto grid grid-cols-2 justify-items-center">
        <NavLink to="/viveres" className="text-2xl font-semibold text-white w-full bg-brand-green h-60 my-0 mx-auto p-2 flex flex-col justify-center items-center hover:bg-[#5accc2]"><img className="mb-2 w-10" src={shopping} alt="" />Precio de Víveres</NavLink>
        <NavLink to="/panaderia" className="text-2xl font-semibold text-white w-full bg-brand-red h-60 my-0 mx-auto p-2 flex flex-col justify-center items-center hover:bg-[#5accc2]"><img className="mb-2 w-10" src={store} alt="" />Precio de panadería</NavLink>
        <NavLink to="/mayor" className="text-2xl font-semibold text-white w-full bg-brand-blue h-60 my-0 mx-auto p-2 flex flex-col justify-center items-center hover:bg-[#5accc2]"><img className="mb-2 w-10" src={truck} alt="" />Precios al mayor</NavLink>
        <NavLink to="/produccion" className="text-2xl font-semibold text-white w-full bg-brand-yellow h-60 my-0 mx-auto p-2 flex flex-col justify-center items-center hover:bg-[#5accc2]"><img className="mb-2 w-10" src={store} alt="" />Producción</NavLink>
      </div>
    </div>
  );
};
