import PropTypes from "prop-types";

/**
 * Friendly empty state with emoji, message, and optional retry button.
 *
 * @param {string} emoji - Emoji to display (default: 🍞)
 * @param {string} message - Friendly message
 * @param {function} onRetry - Optional retry callback
 */
export function EmptyState({
  emoji = "🍞",
  message = "No hay elementos para mostrar",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <span className="text-5xl mb-4">{emoji}</span>
      <p className="text-[var(--color-text-secondary)] text-lg font-medium mb-2">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-6 py-2 rounded-xl bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary)]/90 active:scale-[0.98] transition-all min-h-[44px]"
          type="button"
        >
          Reintentar
        </button>
      )}
    </div>
  );
}

EmptyState.propTypes = {
  emoji: PropTypes.string,
  message: PropTypes.string,
  onRetry: PropTypes.func,
};
