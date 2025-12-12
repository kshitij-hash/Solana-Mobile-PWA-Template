'use client';

import { useState, useRef, useCallback, useEffect, type ReactNode } from 'react';

interface PullToRefreshProps {
  children: ReactNode;
  onRefresh: () => Promise<void>;
  /** Pull distance to trigger refresh (default: 80) */
  pullThreshold?: number;
  /** Maximum pull distance (default: 120) */
  maxPullDistance?: number;
  /** Whether to disable pull-to-refresh (default: false) */
  disabled?: boolean;
  /** Custom loading spinner */
  loadingSpinner?: ReactNode;
  /** Custom pull indicator */
  pullIndicator?: ReactNode;
}

export function PullToRefresh({
  children,
  onRefresh,
  pullThreshold = 80,
  maxPullDistance = 120,
  disabled = false,
  loadingSpinner,
  pullIndicator,
}: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (disabled || isRefreshing) return;

      const container = containerRef.current;
      if (!container) return;

      // Only start pull-to-refresh if we're at the top of the scroll
      if (container.scrollTop > 0) return;

      startY.current = e.touches[0].clientY;
      setIsPulling(true);
    },
    [disabled, isRefreshing]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isPulling || disabled || isRefreshing) return;

      const container = containerRef.current;
      if (!container) return;

      currentY.current = e.touches[0].clientY;
      const diff = currentY.current - startY.current;

      // Only pull down, not up
      if (diff < 0) {
        setPullDistance(0);
        return;
      }

      // Apply resistance to make it feel natural
      const resistance = 0.5;
      const distance = Math.min(diff * resistance, maxPullDistance);

      setPullDistance(distance);

      // Prevent default scroll behavior when pulling
      if (distance > 0) {
        e.preventDefault();
      }
    },
    [isPulling, disabled, isRefreshing, maxPullDistance]
  );

  const handleTouchEnd = useCallback(async () => {
    if (!isPulling || disabled) return;

    setIsPulling(false);

    if (pullDistance >= pullThreshold && !isRefreshing) {
      setIsRefreshing(true);

      try {
        await onRefresh();
      } catch (error) {
        console.error('Refresh failed:', error);
      } finally {
        setIsRefreshing(false);
        setPullDistance(0);
      }
    } else {
      // Animate back to 0
      setPullDistance(0);
    }
  }, [isPulling, disabled, pullDistance, pullThreshold, isRefreshing, onRefresh]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  const progress = Math.min(pullDistance / pullThreshold, 1);
  const showIndicator = pullDistance > 10 || isRefreshing;

  return (
    <div
      ref={containerRef}
      className="pull-to-refresh-container"
      style={{
        height: '100%',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {/* Pull indicator */}
      <div
        className="pull-indicator"
        style={{
          height: pullDistance,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          transition: isPulling ? 'none' : 'height 0.2s ease-out',
        }}
      >
        {showIndicator && (
          <div
            style={{
              opacity: progress,
              transform: `scale(${0.5 + progress * 0.5}) rotate(${progress * 180}deg)`,
              transition: isPulling ? 'none' : 'all 0.2s ease-out',
            }}
          >
            {isRefreshing
              ? loadingSpinner || <DefaultSpinner />
              : pullIndicator || <DefaultPullIndicator progress={progress} />}
          </div>
        )}
      </div>

      {/* Content */}
      <div
        style={{
          transform: `translateY(${isRefreshing ? pullThreshold : 0}px)`,
          transition: isPulling ? 'none' : 'transform 0.2s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
}

function DefaultSpinner() {
  return (
    <div
      style={{
        width: 24,
        height: 24,
        border: '3px solid var(--color-border, #333)',
        borderTopColor: 'var(--color-primary, #9945FF)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }}
    />
  );
}

function DefaultPullIndicator({ progress }: { progress: number }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        color: 'var(--color-text-secondary, #888)',
        fontSize: 12,
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        style={{
          transform: progress >= 1 ? 'rotate(180deg)' : 'none',
          transition: 'transform 0.2s ease',
        }}
      >
        <path d="M12 5v14M5 12l7-7 7 7" />
      </svg>
      <span>{progress >= 1 ? 'Release to refresh' : 'Pull to refresh'}</span>
    </div>
  );
}

// Add CSS keyframes for spinner animation
if (typeof document !== 'undefined') {
  const styleId = 'pull-to-refresh-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }
}
