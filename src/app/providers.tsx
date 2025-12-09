'use client';

import { ReactNode, useState, useEffect } from 'react';
import { WalletProvider } from '@/components/wallet/WalletProvider';
import { SplashScreen } from '@/components/splash/SplashScreen';
import { BottomNav } from '@/components/navigation/BottomNav';
import { ToastProvider } from '@/components/ui/Toast';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <WalletProvider>
      <ToastProvider>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
        <div className="app-container">
          {children}
        </div>
        <BottomNav />
      </ToastProvider>
    </WalletProvider>
  );
}
