'use client';

import { ReactNode, useState, useSyncExternalStore } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletProvider } from '@/components/wallet/WalletProvider';
import { NetworkProvider } from '@/contexts/NetworkContext';
import { SplashScreen } from '@/components/splash/SplashScreen';
import { BottomNav } from '@/components/navigation/BottomNav';
import { ToastProvider } from '@/components/ui/Toast';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Configure your default network here
// Options: WalletAdapterNetwork.Mainnet, WalletAdapterNetwork.Devnet, WalletAdapterNetwork.Testnet
const DEFAULT_NETWORK = WalletAdapterNetwork.Devnet;

interface ProvidersProps {
  children: ReactNode;
}

// Use useSyncExternalStore for hydration-safe mounting detection
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function Providers({ children }: ProvidersProps) {
  const [showSplash, setShowSplash] = useState(true);
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <ErrorBoundary>
      <NetworkProvider network={DEFAULT_NETWORK}>
        <WalletProvider network={DEFAULT_NETWORK}>
          <ToastProvider>
            {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
            <div className="app-container">{children}</div>
            <BottomNav />
          </ToastProvider>
        </WalletProvider>
      </NetworkProvider>
    </ErrorBoundary>
  );
}
