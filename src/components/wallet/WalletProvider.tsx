'use client';

import { useMemo, ReactNode } from 'react';
import {
  ConnectionProvider,
  WalletProvider as SolanaWalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import {
  SolanaMobileWalletAdapter,
  createDefaultAddressSelector,
  createDefaultAuthorizationResultCache,
  createDefaultWalletNotFoundHandler,
} from '@solana-mobile/wallet-adapter-mobile';

// Import wallet adapter styles
import '@solana/wallet-adapter-react-ui/styles.css';

interface WalletProviderProps {
  children: ReactNode;
  network?: WalletAdapterNetwork;
  endpoint?: string;
}

export function WalletProvider({
  children,
  network = WalletAdapterNetwork.Devnet,
  endpoint: customEndpoint,
}: WalletProviderProps) {
  // Use custom endpoint or default to cluster URL
  const endpoint = useMemo(
    () => customEndpoint || clusterApiUrl(network),
    [network, customEndpoint]
  );

  // Configure wallets - Mobile Wallet Adapter for Android
  const wallets = useMemo(() => {
    return [
      new SolanaMobileWalletAdapter({
        addressSelector: createDefaultAddressSelector(),
        appIdentity: {
          name: 'Solana Mobile PWA',
          uri: typeof window !== 'undefined' ? window.location.origin : '',
          icon: '/icons/icon-192x192.png',
        },
        authorizationResultCache: createDefaultAuthorizationResultCache(),
        cluster: network,
        onWalletNotFound: createDefaultWalletNotFoundHandler(),
      }),
    ];
  }, [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
}
