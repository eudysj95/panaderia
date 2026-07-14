import { NavLink, useLocation } from "react-router-dom";

const tabs = [
  { path: "/", label: "Inicio", emoji: "\u{1F3E0}" },
  { path: "/panaderia", label: "Panader\u00eda", emoji: "\u{1F35E}" },
  { path: "/mayor", label: "Mayor", emoji: "\u{1F4E6}" },
  { path: "/produccion", label: "Produc.", emoji: "\u{2699}\u{FE0F}" },
];

export const BottomNav = ({ onAddClick }) => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-[var(--color-surface)] border-t border-[var(--color-border)] z-30 pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around items-center h-16 max-w-5xl mx-auto">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center justify-center min-w-[48px] min-h-[48px] px-2 transition-colors ${
                isActive
                  ? "text-[var(--color-primary)]"
                  : "text-[var(--color-text-secondary)]"
              }`}
            >
              <span className="text-xl leading-none">{tab.emoji}</span>
              <span className="text-[10px] mt-1 font-semibold leading-none">
                {tab.label}
              </span>
            </NavLink>
          );
        })}
        <button
          onClick={onAddClick}
          className="flex flex-col items-center justify-center min-w-[48px] min-h-[48px] px-2 text-[var(--color-accent)] transition-colors"
          aria-label="Agregar"
        >
          <span className="text-xl leading-none">{"\u{2795}"}</span>
          <span className="text-[10px] mt-1 font-semibold leading-none">
            Agregar
          </span>
        </button>
      </div>
    </nav>
  );
};
