# Pull to Refresh

Native-feeling pull gesture for refreshing content.

## Basic Usage

```tsx
import { PullToRefresh } from '@/components/ui/PullToRefresh';

function MyPage() {
  const handleRefresh = async () => {
    await fetchLatestData();
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="content">
        {/* Your scrollable content */}
      </div>
    </PullToRefresh>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onRefresh` | `() => Promise<void>` | Required | Async refresh function |
| `children` | `ReactNode` | Required | Content to wrap |
| `threshold` | `number` | 80 | Pull distance to trigger (px) |
| `disabled` | `boolean` | false | Disable pull gesture |

## Implementation

```tsx
// src/components/ui/PullToRefresh.tsx
import { useState, useRef } from 'react';

export function PullToRefresh({
  onRefresh,
  children,
  threshold = 80,
  disabled = false,
}) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled || isRefreshing) return;
    if (containerRef.current?.scrollTop === 0) {
      startY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (disabled || isRefreshing || !startY.current) return;

    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;

    if (diff > 0 && containerRef.current?.scrollTop === 0) {
      // Apply resistance
      setPullDistance(Math.min(diff * 0.5, threshold * 1.5));
    }
  };

  const handleTouchEnd = async () => {
    if (pullDistance >= threshold && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }
    setPullDistance(0);
    startY.current = 0;
  };

  return (
    <div
      ref={containerRef}
      className="pull-to-refresh-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="pull-indicator"
        style={{
          transform: `translateY(${pullDistance - 40}px)`,
          opacity: pullDistance / threshold,
        }}
      >
        {isRefreshing ? (
          <Spinner />
        ) : (
          <ArrowDown
            style={{
              transform: `rotate(${pullDistance >= threshold ? 180 : 0}deg)`,
            }}
          />
        )}
      </div>

      <div
        style={{
          transform: `translateY(${pullDistance}px)`,
          transition: pullDistance === 0 ? 'transform 0.2s' : 'none',
        }}
      >
        {children}
      </div>
    </div>
  );
}
```

## Styling

```css
.pull-to-refresh-container {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  height: 100%;
}

.pull-indicator {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.pull-indicator svg {
  width: 24px;
  height: 24px;
  color: var(--color-text-secondary);
  transition: transform 0.2s;
}
```

## With Loading State

Show different content while refreshing:

```tsx
function MyPage() {
  const [data, setData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const handleRefresh = async () => {
    const newData = await fetchData();
    setData(newData);
    setLastUpdated(new Date());
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <p className="last-updated">
        Updated {formatTime(lastUpdated)}
      </p>
      <DataList data={data} />
    </PullToRefresh>
  );
}
```

## With Toast Feedback

```tsx
import { useToast } from '@/components/ui/Toast';

function MyPage() {
  const { showToast } = useToast();

  const handleRefresh = async () => {
    try {
      await fetchData();
      showToast('Refreshed!', 'success');
    } catch (error) {
      showToast('Failed to refresh', 'error');
    }
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      {/* content */}
    </PullToRefresh>
  );
}
```

## Disable Conditionally

```tsx
function MyPage() {
  const { isLoading } = useData();

  return (
    <PullToRefresh
      onRefresh={handleRefresh}
      disabled={isLoading}
    >
      {/* content */}
    </PullToRefresh>
  );
}
```

## Custom Indicator

```tsx
<PullToRefresh
  onRefresh={handleRefresh}
  indicator={({ pullDistance, isRefreshing }) => (
    <div className="custom-indicator">
      {isRefreshing ? (
        <Lottie animation={loadingAnimation} />
      ) : (
        <span>{pullDistance > 80 ? 'Release!' : 'Pull down'}</span>
      )}
    </div>
  )}
>
  {children}
</PullToRefresh>
```

## Best Practices

1. **Keep refresh fast** - Under 2 seconds if possible
2. **Show feedback** - Toast or visual update on complete
3. **Handle errors** - Don't fail silently
4. **Disable during actions** - Prevent double-refresh
5. **Test on real devices** - Touch behavior varies
