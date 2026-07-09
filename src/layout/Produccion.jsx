import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ListadoContext } from "../context/ListadoContext";
import back from "../assets/icons/circle-back.svg";

export const Produccion = () => {
  const { materials, exchangeRate, loading, error } =
    useContext(ListadoContext);
  const [ingredientes, setIngredientes] = useState({});
  const [costBreakdown, setCostBreakdown] = useState(null);

  const handleInputChange = (e, id) => {
    setIngredientes((prev) => ({
      ...prev,
      [id]: e.target.value,
    }));
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

        <button
          onClick={calcularCosto}
          name="costo"
          type="button"
          className="bg-white text-black px-4 py-2 rounded-md font-semibold hover:bg-gray-200 transition-colors"
        >
          Costo
        </button>
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
                    {item.weight > 0 ? item.weight.toFixed(2) : "\u2014"}
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
    </div>
  );
};
