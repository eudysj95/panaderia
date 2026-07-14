import PropTypes from "prop-types";

export function ProductCard({
  producto,
  precioUSD,
  precioBS,
  originalUSD,
  originalBS,
  _id,
  emoji = "🍞",
  onEdit,
  onDelete,
}) {
  return (
    <article className="w-full min-h-[9rem] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all">
      <div className="p-4 text-center">
        {/* Emoji + Name */}
        <span className="text-3xl block mb-1">{emoji}</span>
        <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
          {producto}
        </h3>

        {/* USD price */}
        {originalUSD != null ? (
          <div className="mt-2">
            <span className="text-[var(--color-text-disabled)] text-sm line-through">
              {originalUSD.toFixed(3)} $
            </span>
            <span className="ml-1 font-bold text-[var(--color-success)]">
              {precioUSD.toFixed(3)} $
            </span>
          </div>
        ) : (
          <p className="mt-2 text-[var(--color-text-primary)] font-semibold">
            {precioUSD.toFixed(3)} $
          </p>
        )}

        {/* Bs price */}
        {precioBS != null &&
          (originalBS != null ? (
            <div className="mt-1">
              <span className="text-[var(--color-text-disabled)] text-sm line-through">
                {originalBS.toFixed(3)} Bs
              </span>
              <span className="ml-1 font-bold text-[var(--color-success)]">
                {precioBS.toFixed(3)} Bs
              </span>
            </div>
          ) : (
            <p className="mt-1 text-[var(--color-accent)] font-semibold">
              {precioBS.toFixed(3)} Bs
            </p>
          ))}
      </div>

      {(onEdit || onDelete) && (
        <div className="flex justify-center gap-2 pb-3">
          {onEdit && (
            <button
              onClick={() => onEdit(_id)}
              className="text-xs px-3 py-1.5 rounded-xl bg-[var(--color-surface-alt)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:bg-[var(--color-border)] transition-colors min-h-[44px] font-medium"
              type="button"
              aria-label={`Editar ${producto}`}
            >
              Editar
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(_id)}
              className="text-xs px-3 py-1.5 rounded-xl bg-[var(--color-error)]/10 text-[var(--color-error)] border border-[var(--color-error)]/20 hover:bg-[var(--color-error)]/20 transition-colors min-h-[44px] font-medium"
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
  emoji: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};
