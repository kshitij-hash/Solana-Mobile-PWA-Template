import { useCallback } from 'react';

/**
 * Wraps a callback in try-catch to suppress errors silently.
 * This is used to handle MWA connection/signing errors gracefully.
 *
 * @see https://github.com/solana-mobile/mobile-wallet-adapter/blob/main/examples/example-web-app/utils/useGuardedCallback.ts
 */
export default function useGuardedCallback<TArgs extends Array<unknown>, TReturn>(
  cb: (...args: TArgs) => TReturn,
  dependencies?: Array<unknown>,
) {
  return useCallback(
    async (...args: TArgs) => {
      try {
        return await cb(...args);
      } catch (error) {
        console.log('[useGuardedCallback] Suppressed error:', error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...(dependencies || [])],
  ) as (...args: TArgs) => Promise<Awaited<TReturn> | void>;
}
