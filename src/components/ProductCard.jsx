import PropTypes from "prop-types";

export function ProductCard({ producto, precioUSD, precioBS }) {
  return (
    <article className="w-44 h-28 text-veryDarkBlue mb-4 text-center border-2 shadow pt-1 rounded-2xl">
      <h3 className="mt-2 text-base font-medium">{producto}</h3>
      <p className="mt-2">{precioUSD.toFixed(3)} $</p>
      {precioBS != null && (
        <p className="mt-2">{precioBS.toFixed(3)} Bs</p>
      )}
    </article>
  );
}

ProductCard.propTypes = {
  producto: PropTypes.string.isRequired,
  precioUSD: PropTypes.number.isRequired,
  precioBS: PropTypes.number,
};
