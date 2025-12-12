/**
 * Mobile Wallet Adapter Registration
 *
 * This module registers MWA at import time, following the official example pattern.
 * Import this module as early as possible in your app entry point.
 *
 * @see https://github.com/solana-mobile/mobile-wallet-adapter/blob/main/examples/example-web-app/pages/_app.tsx
 */

import {
  registerMwa,
  createDefaultChainSelector,
  createDefaultWalletNotFoundHandler,
} from '@solana-mobile/wallet-standard-mobile';

function getUriForAppIdentity() {
  const location = globalThis.location;
  if (!location) return;
  return `${location.protocol}//${location.host}`;
}

// Register MWA immediately when this module is imported (client-side only)
// This must happen before WalletProvider initializes
if (typeof window !== 'undefined') {
  // Disable authorization cache to force fresh connection each time
  // This prevents stale cached authorizations from causing silent failures
  const noCache = {
    get: async () => undefined,
    set: async () => {},
    clear: async () => {},
  };

  registerMwa({
    appIdentity: {
      uri: getUriForAppIdentity(),
      name: 'Solana Mobile PWA',
      icon: '/icons/icon-192x192.png',
    },
    authorizationCache: noCache,
    chains: ['solana:devnet'],
    chainSelector: createDefaultChainSelector(),
    onWalletNotFound: createDefaultWalletNotFoundHandler(),
  });
}

export function isAndroidMobile() {
  return (
    typeof window !== 'undefined' &&
    window.isSecureContext &&
    typeof document !== 'undefined' &&
    /android/i.test(navigator.userAgent)
  );
}
