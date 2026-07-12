import PropTypes from "prop-types";

export function ProductCard({
  producto,
  precioUSD,
  precioBS,
  originalUSD,
  originalBS,
  _id,
  onEdit,
  onDelete,
}) {
  return (
    <article className="w-44 min-h-[9rem] text-veryDarkBlue mb-4 text-center border-2 shadow pt-1 rounded-2xl flex flex-col justify-between">
      <div>
        <h3 className="mt-2 text-base font-medium">{producto}</h3>

        {/* USD price */}
        {originalUSD != null ? (
          <div className="mt-2">
            <span className="text-gray-400 text-sm line-through">
              {originalUSD.toFixed(3)} $
            </span>
            <span className="ml-1 font-bold text-green-700">
              {precioUSD.toFixed(3)} $
            </span>
          </div>
        ) : (
          <p className="mt-2">{precioUSD.toFixed(3)} $</p>
        )}

        {/* Bs price */}
        {precioBS != null && (
          originalBS != null ? (
            <div className="mt-1">
              <span className="text-gray-400 text-sm line-through">
                {originalBS.toFixed(3)} Bs
              </span>
              <span className="ml-1 font-bold text-green-700">
                {precioBS.toFixed(3)} Bs
              </span>
            </div>
          ) : (
            <p className="mt-2">{precioBS.toFixed(3)} Bs</p>
          )
        )}
      </div>
      {(onEdit || onDelete) && (
        <div className="flex justify-center gap-2 pb-2 mt-1">
          {onEdit && (
            <button
              onClick={() => onEdit(_id)}
              className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
              type="button"
              aria-label={`Editar ${producto}`}
            >
              Editar
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(_id)}
              className="text-xs px-2 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
              type="button"
              aria-label={`Eliminar ${producto}`}
            >
              Eliminar
            </button>
          )}
        </div>
      )}
    </article>
  );
}

ProductCard.propTypes = {
  producto: PropTypes.string.isRequired,
  precioUSD: PropTypes.number.isRequired,
  precioBS: PropTypes.number,
  originalUSD: PropTypes.number,
  originalBS: PropTypes.number,
  _id: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};
