import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

export const EmojiCard = ({
  emoji,
  title,
  subtitle,
  to,
  onClick,
  variant = "nav",
  badge,
  className = "",
}) => {
  const baseClasses =
    "relative flex flex-col items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-all active:scale-[0.98] active:shadow-md";

  const variantClasses =
    variant === "nav"
      ? "p-6 h-44 text-center"
      : "p-4 h-36 text-left items-start justify-start";

  const content = (
    <>
      {badge != null && (
        <span className="absolute top-2 right-2 bg-[var(--color-accent)] text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
          {badge}
        </span>
      )}
      <span className="text-3xl mb-2">{emoji}</span>
      <span className="font-bold text-[var(--color-text-primary)] text-sm">
        {title}
      </span>
      {subtitle && (
        <span className="text-xs text-[var(--color-text-secondary)] mt-1">
          {subtitle}
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <NavLink
        to={to}
        className={`${baseClasses} ${variantClasses} hover:shadow-md ${className}`}
      >
        {content}
      </NavLink>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} hover:shadow-md w-full ${className}`}
    >
      {content}
    </button>
  );
};

EmojiCard.propTypes = {
  emoji: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["nav", "product"]),
  badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};
