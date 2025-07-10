import { Link } from "react-router-dom";
import back from "../assets/icons/circle-back.svg";
import materia from "../assets/dataMateriaPrima.json";

export const Produccion = () => {

    var arreglo = [];
    var ingredientes = [];
    var peso = [];

const calcularCosto = () => {
    let suma = 0;
    for (let i=0; i < arreglo.length; i++){
      suma += parseFloat(arreglo[i]);
    }
    let array = [];
    for(let i = 0; i < ingredientes.length; i++){
      array[i] = ingredientes[i] + " = " + peso[i]
    }
    alert(array);
    alert(suma);
}

const funcion = (e, id) => {
    let valor = parseFloat(materia[id].precio * e.target.value);
    arreglo[id] = valor.toFixed(2);
    ingredientes[id] = materia[id].producto;
    peso[id] = e.target.value;
}

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

        <button onClick={calcularCosto} name="costo">Costo</button>

      </div>

      {materia.map((item) =>{
            return (
                <article
                  key={item.id}
                  className="w-44 h-28 text-veryDarkBlue mb-4 text-center border-2 shadow pt-1 rounded-2xl"
                >
                  <h3 className="mt-2 text-base font-medium">
                    {item.producto}
                  </h3>
                  <p className="mt-2">{item.precio.toFixed(2)} $</p>
                  <input className="w-20 rounded-md text-black" type="number" step="0.01" name={item.producto} onChange={e => funcion(e, item.id)}/>
                </article>
            )
        })}
    </div>
  );
};
