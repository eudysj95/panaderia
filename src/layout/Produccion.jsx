import { useState } from "react";
import { Link } from "react-router-dom";
import back from "../assets/icons/circle-back.svg";
import materia from "../assets/dataMateriaPrima.json";

export const Produccion = () => {
  const [ingredientes, setIngredientes] = useState({});
  const [costBreakdown, setCostBreakdown] = useState(null);

  const handleInputChange = (e, id) => {
    setIngredientes((prev) => ({
      ...prev,
      [id]: e.target.value,
    }));
  };

  const calcularCosto = () => {
    const breakdown = [];
    let total = 0;

    for (let i = 0; i < materia.length; i++) {
      const item = materia[i];
      const weight = parseFloat(ingredientes[i]) || 0;

      let subtotal = 0;
      if (weight > 0) {
        subtotal = item.precio * weight;
      }

      total += subtotal;
      breakdown.push({
        id: i,
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
        <Link to="/inicio">
          <img
            src={back}
            alt="back"
            className="w-12 bg-white rounded-[50%] mt-4"
          />
        </Link>

        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold">Producción</h1>
        </div>

        <button onClick={calcularCosto} name="costo">
          Costo
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {materia.map((item) => {
          return (
            <article
              key={item.id}
              className="w-44 h-28 text-veryDarkBlue mb-4 text-center border-2 shadow pt-1 rounded-2xl"
            >
              <h3 className="mt-2 text-base font-medium">{item.producto}</h3>
              <p className="mt-2">{item.precio.toFixed(2)} $</p>
              <input
                className="w-20 rounded-md text-black"
                type="number"
                step="0.01"
                name={item.producto}
                value={ingredientes[item.id] ?? ""}
                onChange={(e) => handleInputChange(e, item.id)}
              />
            </article>
          );
        })}
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
                <th className="text-right py-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {costBreakdown.breakdown.map((item) => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="py-1">{item.name}</td>
                  <td className="text-right py-1">
                    {item.weight > 0 ? item.weight.toFixed(2) : "—"}
                  </td>
                  <td className="text-right py-1">
                    ${item.subtotal.toFixed(2)}
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
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};
