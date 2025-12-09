'use client';

import { ReactNode, useState, useSyncExternalStore } from 'react';
import { WalletProvider } from '@/components/wallet/WalletProvider';
import { SplashScreen } from '@/components/splash/SplashScreen';
import { BottomNav } from '@/components/navigation/BottomNav';
import { ToastProvider } from '@/components/ui/Toast';

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
    <WalletProvider>
      <ToastProvider>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
        <div className="app-container">{children}</div>
        <BottomNav />
      </ToastProvider>
    </WalletProvider>
  );
}
