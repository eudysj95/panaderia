import { useState, useEffect } from "react";
import { Marco } from "../components/Marco";

const DISCOUNT_STORAGE_KEY = "mayorDiscount";
const DEFAULT_DISCOUNT = 15;

function getStoredDiscount() {
  try {
    const stored = localStorage.getItem(DISCOUNT_STORAGE_KEY);
    if (stored !== null) {
      const parsed = parseFloat(stored);
      if (!isNaN(parsed) && parsed >= 0 && parsed <= 100) return parsed;
    }
  } catch {
    // localStorage unavailable
  }
  return DEFAULT_DISCOUNT;
}

export const PreciosMayor = () => {
  const [discount, setDiscount] = useState(getStoredDiscount);

  useEffect(() => {
    try {
      localStorage.setItem(DISCOUNT_STORAGE_KEY, discount.toString());
    } catch {
      // localStorage unavailable
    }
  }, [discount]);

  const handleDiscountChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      setDiscount(value);
    }
  };

  return (
    <div>
      <div className="flex justify-center mt-2 mb-0">
        <div className="flex items-center gap-2 text-sm text-muted">
          <label htmlFor="mayor-discount">Descuento:</label>
          <input
            id="mayor-discount"
            type="range"
            min="0"
            max="50"
            step="1"
            value={discount}
            onChange={handleDiscountChange}
            className="w-28 accent-accent"
            aria-label="Porcentaje de descuento al mayor"
          />
          <span className="font-bold text-accent w-12 text-center">
            {discount}%
          </span>
        </div>
      </div>
      <Marco title="Precios al Mayor" metodo="mayor" discount={discount} />
    </div>
  );
};
