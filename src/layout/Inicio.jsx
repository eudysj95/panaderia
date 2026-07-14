import { useContext } from "react";
import { EmojiCard } from "../components/EmojiCard";
import { ListadoContext } from "../context/ListadoContext";

export const Inicio = () => {
  const { exchangeRate, updateExchangeRate } = useContext(ListadoContext);

  return (
    <div className="flex flex-col items-center">
      {/* Hero */}
      <section className="w-full -mx-4 sm:-mx-10 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-b-3xl px-6 pt-12 pb-8 text-center text-white mb-8">
        <h1 className="text-4xl font-bold mb-2">Panadería</h1>
        <p className="text-sm opacity-80 mb-6">Control de precios y producción</p>

        <div className="inline-flex items-center gap-2 bg-white/20 rounded-xl px-4 py-2 backdrop-blur-sm">
          <span className="font-medium">Tasa:</span>
          <input
            type="number"
            step="1"
            min="1"
            value={exchangeRate}
            onChange={(e) => updateExchangeRate(e.target.value)}
            className="w-20 text-center bg-white/30 rounded px-2 py-1 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
            aria-label="Tasa de cambio Bs/USD"
          />
          <span className="opacity-80">Bs/USD</span>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        <EmojiCard emoji="🍞" title="Panadería" subtitle="Precios del pan" to="/panaderia" />
        <EmojiCard emoji="🛒" title="Víveres" subtitle="Precios de víveres" to="/viveres" />
        <EmojiCard emoji="📦" title="Mayor" subtitle="Precios al por mayor" to="/mayor" />
        <EmojiCard emoji="⚙️" title="Producción" subtitle="Control de costos" to="/produccion" />
      </section>
    </div>
  );
};
