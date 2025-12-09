'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletButton } from '@/components/wallet/WalletButton';
import { Header } from '@/components/navigation/Header';
import { Zap, Shield, Smartphone, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const { connected } = useWallet();

  return (
    <>
      <Header title="Solana Mobile PWA" />

      <main className="main-content">
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

        {/* Quick Connect */}
        {!connected && (
          <section className="mb-8">
            <WalletButton className="w-full" />
          </section>
        )}

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

        {/* CTA */}
        {connected && (
          <section className="mt-8">
            <a href="/wallet" className="btn btn-primary w-full">
              <span>View Wallet</span>
              <ArrowRight size={20} />
            </a>
          </section>
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
