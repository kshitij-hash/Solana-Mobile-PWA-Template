'use client';

import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/navigation/Header';
import { WalletButton } from '@/components/wallet/WalletButton';
import { RefreshCw } from 'lucide-react';

export default function WalletPage() {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
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
      <Header title="Wallet" showBack />

      <main className="main-content">
        {connected && publicKey ? (
          <div className="space-y-6">
            {/* Balance Card */}
            <div className="card text-center">
              <p className="text-sm text-(--color-text-secondary) mb-2">Balance</p>
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-4xl font-bold gradient-text">
                  {loading ? '...' : (balance?.toFixed(4) ?? '0')}
                </h2>
                <span className="text-xl text-(--color-text-secondary)">SOL</span>
              </div>
              <button
                onClick={fetchBalance}
                disabled={loading}
                className="mt-4 touchable inline-flex items-center gap-2 text-sm text-(--color-primary)"
              >
                <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                Refresh
              </button>
            </div>

            {/* Wallet Info */}
            <WalletButton />

            {/* Network Info */}
            <div className="card">
              <h3 className="font-semibold mb-2">Network</h3>
              <p className="text-sm text-(--color-text-secondary)">Devnet</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <p className="text-(--color-text-secondary) mb-6">
              Connect your wallet to view balance
            </p>
            <WalletButton />
          </div>
        )}
      </main>
    </>
  );
}
