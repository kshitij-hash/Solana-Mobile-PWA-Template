'use client';

// Import MWA registration first - this registers MWA before anything else
import { isAndroidMobile } from '@/lib/mwa';

import { useMemo, ReactNode, useCallback } from 'react';
import {
  ConnectionProvider,
  WalletProvider as SolanaWalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';

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

  // Handle wallet errors - only log non-connection errors
  // WalletAccountError can happen during autoConnect when wallet isn't ready
  const handleWalletError = useCallback((error: WalletError) => {
    // Suppress common errors that occur during normal connection flow
    if (error.name === 'WalletAccountError' || error.name === 'WalletNotReadyError') {
      console.log(`[Wallet] Suppressed expected error: ${error.name}`);
      return;
    }
    console.error(`Wallet error: ${error.name}: ${error.message}`);
  }, []);

  // Empty wallets array - MWA is registered via wallet-standard above
  // SolanaMobileWalletAdapter is added automatically in compatible mobile contexts
  const wallets = useMemo(() => [], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider
        wallets={wallets}
        autoConnect={isAndroidMobile()}
        onError={handleWalletError}
      >
        <WalletModalProvider>{children}</WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
}
