import { useNavigate } from "react-router-dom";

export const AddActionSheet = ({ onClose }) => {
  const navigate = useNavigate();

  const actions = [
    {
      label: "Agregar Producto",
      emoji: "\u{1F4E6}",
      onClick: () => {
        onClose();
        navigate("/panaderia");
      },
    },
    {
      label: "Agregar Material",
      emoji: "\u{1F9EA}",
      onClick: () => {
        onClose();
        navigate("/produccion");
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-40" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="absolute bottom-0 inset-x-0 bg-[var(--color-surface)] rounded-t-2xl p-6 pb-8 transition-transform z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1 bg-[var(--color-border)] rounded-full mx-auto mb-4" />
        <h3 className="text-[var(--color-text-primary)] font-bold text-lg mb-4 text-center">
          {"\u{2795}"} Agregar
        </h3>
        <div className="space-y-3">
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={action.onClick}
              className="w-full flex items-center gap-3 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] active:scale-[0.98] transition-all"
            >
              <span className="text-2xl">{action.emoji}</span>
              <span className="font-semibold text-[var(--color-text-primary)]">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
