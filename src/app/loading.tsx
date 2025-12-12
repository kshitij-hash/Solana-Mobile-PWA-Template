/**
 * Loading skeleton for the root layout
 * Shown during route transitions
 */
export default function Loading() {
  return (
    <div className="main-content">
      {/* Header skeleton */}
      <div className="h-14 mb-6">
        <div className="h-6 w-32 mx-auto bg-(--color-surface-elevated) rounded-lg animate-pulse" />
      </div>

      {/* Content skeleton */}
      <div className="space-y-4">
        {/* Hero skeleton */}
        <div className="text-center mb-8">
          <div className="h-10 w-48 mx-auto bg-(--color-surface-elevated) rounded-lg animate-pulse mb-3" />
          <div className="h-5 w-64 mx-auto bg-(--color-surface-elevated) rounded-lg animate-pulse" />
        </div>

        {/* Card skeletons */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="card">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-(--color-surface-elevated) animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-32 bg-(--color-surface-elevated) rounded animate-pulse" />
                <div className="h-4 w-full bg-(--color-surface-elevated) rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
