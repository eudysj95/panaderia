import PropTypes from "prop-types";

/**
 * Search input with warm bakery tokens.
 * Controlled component — value and onChange managed by parent.
 *
 * @param {string} value - Current search value
 * @param {function} onChange - Called with (value) on each keystroke
 * @param {string} placeholder - Input placeholder text
 */
export function SearchBar({ value, onChange, placeholder = "Buscar..." }) {
  return (
    <input
      onChange={(e) => onChange(e.target.value)}
      value={value}
      className="text-[var(--color-text-primary)] bg-[var(--color-surface-alt)] border border-[var(--color-border)] ring-0 focus:ring-2 focus:ring-[var(--color-primary)] w-40 px-3 py-2 rounded-xl transition-colors min-h-[44px]"
      type="text"
      name="busqueda"
      placeholder={placeholder}
      aria-label="Buscar productos"
    />
  );
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};
