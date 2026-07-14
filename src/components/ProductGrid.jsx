import PropTypes from "prop-types";
import { ProductCard } from "./ProductCard";
import { EmptyState } from "./EmptyState";

/**
 * Responsive grid of ProductCards with price calculation.
 * Extracted from Marco.jsx — handles basePrice, discount, and exchange rate math.
 *
 * @param {Array} items - List of product items
 * @param {number} exchangeRate - Current USD → Bs rate
 * @param {string} metodo - Category key ('panes', 'viveres', 'mayor')
 * @param {number} discount - Discount percentage (used when metodo === 'mayor')
 * @param {function} onEdit - Edit callback (receives item._id)
 * @param {function} onDelete - Delete callback (receives item._id)
 */
export function ProductGrid({
  items,
  exchangeRate,
  metodo,
  discount = 0,
  onEdit,
  onDelete,
}) {
  if (items.length === 0) {
    return <EmptyState emoji="🔍" message="No se encontraron productos" />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((item) => {
        const basePrice =
          metodo === "viveres" ? (item.precio / item.unidades) * 1.2 : item.precio;
        const precioUSD =
          metodo === "mayor" ? basePrice * (1 - discount / 100) : basePrice;
        const originalUSD = metodo === "mayor" ? basePrice : null;

        return (
          <ProductCard
            key={item._id}
            _id={item._id}
            producto={item.producto}
            precioUSD={precioUSD}
            precioBS={precioUSD * exchangeRate}
            originalUSD={originalUSD}
            originalBS={originalUSD != null ? originalUSD * exchangeRate : null}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
}

ProductGrid.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      producto: PropTypes.string.isRequired,
      precio: PropTypes.number.isRequired,
      unidades: PropTypes.number,
    })
  ).isRequired,
  exchangeRate: PropTypes.number.isRequired,
  metodo: PropTypes.string.isRequired,
  discount: PropTypes.number,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
