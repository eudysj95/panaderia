/**
 * Skeleton placeholder cards for loading states.
 * Uses the skeleton-shimmer CSS animation defined in index.css.
 *
 * @param {number} count - Number of skeleton cards to render (default 3)
 * @param {string} variant - 'card' for product cards, 'list' for list items (default 'card')
 */
export function SkeletonLoader({ count = 3, variant = "card" }) {
  if (variant === "list") {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="skeleton-shimmer h-14 rounded-2xl w-full"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="skeleton-shimmer rounded-2xl h-40 w-full"
        />
      ))}
    </div>
  );
}
