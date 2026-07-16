import PropTypes from "prop-types";

/**
 * Reusable bottom sheet with overlay and slide-up animation.
 * Content slides up from the bottom with rounded top corners.
 *
 * @param {boolean} isOpen - Whether the sheet is visible
 * @param {function} onClose - Called when overlay is tapped
 * @param {string} title - Optional title displayed in the sheet
 * @param {React.ReactNode} children - Sheet content
 * @param {string} className - Additional classes for the sheet container
 */
export function BottomSheet({ isOpen, onClose, title, children, className = "" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 overlay-animate" />
      <div
        className={`absolute bottom-0 inset-x-0 bg-[var(--color-surface)] rounded-t-2xl p-6 pb-8 max-h-[85vh] overflow-y-auto bottom-sheet-animate z-50 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="w-12 h-1 bg-[var(--color-border)] rounded-full mx-auto mb-4" />

        {title && (
          <h2 className="text-[var(--color-text-primary)] font-bold text-xl mb-4 text-center">
            {title}
          </h2>
        )}

        {children}
      </div>
    </div>
  );
}

BottomSheet.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};
