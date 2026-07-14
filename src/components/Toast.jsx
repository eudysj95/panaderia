import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const typeStyles = {
  error: "bg-[var(--color-error)]",
  success: "bg-[var(--color-success)]",
  warning: "bg-[var(--color-warning)]",
};

/**
 * Themed toast notification with auto-dismiss.
 *
 * @param {string} message - Toast message
 * @param {"error"|"success"|"warning"} type - Toast style variant
 * @param {function} onDismiss - Called when toast is dismissed
 * @param {number} duration - Auto-dismiss delay in ms (default 5000)
 */
export function Toast({ message, type = "error", onDismiss, duration = 5000 }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDismiss?.(), 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  return (
    <div
      className={`fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-white text-sm font-medium max-w-[90vw] transition-all duration-300 ${
        typeStyles[type] || typeStyles.error
      } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
      role="alert"
    >
      <span className="flex-1">{message}</span>
      <button
        onClick={() => {
          setVisible(false);
          setTimeout(() => onDismiss?.(), 300);
        }}
        className="text-white/80 hover:text-white font-bold ml-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
        type="button"
        aria-label="Cerrar"
      >
        ✕
      </button>
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["error", "success", "warning"]),
  onDismiss: PropTypes.func,
  duration: PropTypes.number,
};
