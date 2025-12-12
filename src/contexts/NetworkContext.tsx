'use client';

import { createContext, useContext, ReactNode, useMemo } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';

interface NetworkContextType {
  network: WalletAdapterNetwork;
  endpoint: string;
  networkName: string;
  isMainnet: boolean;
  isDevnet: boolean;
  isTestnet: boolean;
}

const NetworkContext = createContext<NetworkContextType | null>(null);

/**
 * Get human-readable network name
 */
function getNetworkName(network: WalletAdapterNetwork): string {
  switch (network) {
    case WalletAdapterNetwork.Mainnet:
      return 'Mainnet';
    case WalletAdapterNetwork.Devnet:
      return 'Devnet';
    case WalletAdapterNetwork.Testnet:
      return 'Testnet';
    default:
      return 'Unknown';
  }
}

interface NetworkProviderProps {
  children: ReactNode;
  network?: WalletAdapterNetwork;
  endpoint?: string;
}

/**
 * Network provider that exposes the current Solana network configuration.
 * Used by components to display the network name dynamically.
 */
export function NetworkProvider({
  children,
  network = WalletAdapterNetwork.Devnet,
  endpoint: customEndpoint,
}: NetworkProviderProps) {
  const value = useMemo(() => {
    const endpoint = customEndpoint || clusterApiUrl(network);
    return {
      network,
      endpoint,
      networkName: getNetworkName(network),
      isMainnet: network === WalletAdapterNetwork.Mainnet,
      isDevnet: network === WalletAdapterNetwork.Devnet,
      isTestnet: network === WalletAdapterNetwork.Testnet,
    };
  }, [network, customEndpoint]);

  return <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>;
}

/**
 * Hook to access network configuration
 */
export function useNetwork() {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error('useNetwork must be used within a NetworkProvider');
  }
  return context;
}
