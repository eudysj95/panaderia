import { useNavigate, useLocation } from "react-router-dom";

export const SectionHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (pathname === "/") return null;

  const titles = {
    "/panaderia": "Panader\u00eda",
    "/viveres": "V\u00edveres",
    "/mayor": "Precios al Mayor",
    "/produccion": "Producci\u00f3n",
  };

  return (
    <header className="sticky top-0 z-20 bg-[var(--color-surface)] border-b border-[var(--color-border)] px-4 h-14 flex items-center justify-center relative">
      <button
        onClick={() => navigate("/")}
        className="absolute left-4 text-[var(--color-primary)] text-xl font-bold"
        aria-label="Volver a Inicio"
      >
        {"\u{2190}"}
      </button>
      <h1 className="text-[var(--color-text-primary)] font-bold text-lg">
        {titles[pathname] || ""}
      </h1>
    </header>
  );
};
