'use client';

import { useState, useCallback } from 'react';

interface UsePullToRefreshOptions {
  /** Function to call on refresh */
  onRefresh: () => Promise<void>;
  /** Minimum refresh duration in ms (default: 500) */
  minRefreshTime?: number;
}

interface UsePullToRefreshReturn {
  /** Whether a refresh is in progress */
  isRefreshing: boolean;
  /** Trigger a refresh programmatically */
  refresh: () => Promise<void>;
  /** Handler for the PullToRefresh component */
  handleRefresh: () => Promise<void>;
}

/**
 * Hook for managing pull-to-refresh state
 *
 * @example
 * ```tsx
 * const { isRefreshing, handleRefresh } = usePullToRefresh({
 *   onRefresh: async () => {
 *     await fetchData();
 *   },
 * });
 *
 * return (
 *   <PullToRefresh onRefresh={handleRefresh}>
 *     {isRefreshing ? <Loading /> : <Content />}
 *   </PullToRefresh>
 * );
 * ```
 */
export function usePullToRefresh({
  onRefresh,
  minRefreshTime = 500,
}: UsePullToRefreshOptions): UsePullToRefreshReturn {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    const startTime = Date.now();

    try {
      await onRefresh();
    } catch (error) {
      console.error('Refresh failed:', error);
      throw error;
    } finally {
      // Ensure minimum refresh time for better UX
      const elapsed = Date.now() - startTime;
      const remaining = minRefreshTime - elapsed;

      if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining));
      }

      setIsRefreshing(false);
    }
  }, [isRefreshing, onRefresh, minRefreshTime]);

  const refresh = useCallback(async () => {
    await handleRefresh();
  }, [handleRefresh]);

  return {
    isRefreshing,
    refresh,
    handleRefresh,
  };
}
