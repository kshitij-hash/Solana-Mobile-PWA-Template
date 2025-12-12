'use client';

import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { WalletButton } from '@/components/wallet/WalletButton';
import { Header } from '@/components/navigation/Header';
import { Send, Wallet, RefreshCw, Smartphone, Zap, Shield } from 'lucide-react';
import { useNetwork } from '@/contexts/NetworkContext';

export default function HomePage() {
  const { connected, publicKey } = useWallet();
  const { connection } = useConnection();
  const { networkName } = useNetwork();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchBalance = useCallback(async () => {
    if (!publicKey) return;
    setLoading(true);
    try {
      const bal = await connection.getBalance(publicKey);
      setBalance(bal / LAMPORTS_PER_SOL);
    } catch (error) {
      console.error('Error fetching balance:', error);
    } finally {
      setLoading(false);
    }
  }, [publicKey, connection]);

  useEffect(() => {
    if (connected && publicKey) {
      fetchBalance();
    } else {
      setBalance(null);
    }
  }, [connected, publicKey, fetchBalance]);

  return (
    <>
      <Header title="Solana Mobile PWA" />

      <main className="main-content">
        {connected && publicKey ? (
          <>
            {/* Balance Card */}
            <section className="card text-center mb-6">
              <p className="text-sm text-(--color-text-secondary) mb-1">Balance</p>
              <div className="flex items-center justify-center gap-2 mb-2">
                <h2 className="text-4xl font-bold gradient-text">
                  {loading ? '...' : (balance?.toFixed(4) ?? '0')}
                </h2>
                <span className="text-xl text-(--color-text-secondary)">SOL</span>
              </div>
              <button
                onClick={fetchBalance}
                disabled={loading}
                className="touchable inline-flex items-center gap-2 text-sm text-(--color-primary)"
              >
                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                Refresh
              </button>
              <p className="text-xs text-(--color-text-secondary) mt-2">{networkName}</p>
            </section>

            {/* Quick Actions */}
            <section className="grid grid-cols-2 gap-3 mb-6">
              <Link href="/wallet" className="card flex flex-col items-center py-4 touchable hover:border-(--color-primary) transition-colors">
                <div className="w-12 h-12 rounded-full bg-(--color-primary)/20 flex items-center justify-center mb-2">
                  <Wallet size={24} className="text-(--color-primary)" />
                </div>
                <span className="font-medium">Wallet</span>
              </Link>
              <Link href="/send" className="card flex flex-col items-center py-4 touchable hover:border-(--color-secondary) transition-colors">
                <div className="w-12 h-12 rounded-full bg-(--color-secondary)/20 flex items-center justify-center mb-2">
                  <Send size={24} className="text-(--color-secondary)" />
                </div>
                <span className="font-medium">Send</span>
              </Link>
            </section>

            {/* Wallet Address */}
            <section className="card mb-6">
              <p className="text-xs text-(--color-text-secondary) mb-1">Connected Wallet</p>
              <p className="font-mono text-sm break-all">{publicKey.toBase58()}</p>
            </section>
          </>
        ) : (
          <>
            {/* Hero Section */}
            <section className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-3">
                <span className="gradient-text">Solana Mobile</span>
                <br />
                PWA Template
              </h1>
              <p className="text-(--color-text-secondary) text-lg">
                Mobile-optimized dApp with MWA integration
              </p>
            </section>

            {/* Connect Wallet */}
            <section className="mb-8">
              <WalletButton className="w-full" />
            </section>

            {/* Features */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold mb-4">Features</h2>

              <FeatureCard
                icon={<Smartphone className="text-(--color-primary)" />}
                title="Mobile Wallet Adapter"
                description="Connect seamlessly with Solana mobile wallets"
              />

              <FeatureCard
                icon={<Zap className="text-(--color-secondary)" />}
                title="PWA Ready"
                description="Install as a native-like app on any device"
              />

              <FeatureCard
                icon={<Shield className="text-(--color-primary)" />}
                title="Safe Area Support"
                description="Handles notches and gesture bars properly"
              />
            </section>
          </>
        )}
      </main>
    </>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="card flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-(--color-surface-elevated) flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-(--color-text-secondary)">{description}</p>
      </div>
    </div>
  );
}
