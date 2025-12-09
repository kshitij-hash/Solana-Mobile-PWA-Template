'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Header } from '@/components/navigation/Header';
import { WalletButton } from '@/components/wallet/WalletButton';
import { useToast } from '@/components/ui/Toast';
import { Send, Info } from 'lucide-react';

export default function SendPage() {
  const { connected } = useWallet();
  const { showToast } = useToast();

  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleSend = () => {
    if (!recipient || !amount) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    // Validate address format (basic check)
    if (recipient.length < 32 || recipient.length > 44) {
      showToast('Invalid Solana address', 'error');
      return;
    }

    // Demo: Show success message
    showToast(`Demo: Would send ${amount} SOL to ${recipient.slice(0, 8)}...`, 'info');
  };

  if (!connected) {
    return (
      <>
        <Header title="Send SOL" showBack />
        <main className="main-content">
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <p className="text-(--color-text-secondary) mb-6">Connect your wallet to send SOL</p>
            <WalletButton />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header title="Send SOL" showBack />

      <main className="main-content">
        <div className="space-y-6">
          {/* Form */}
          <div className="card space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Recipient Address</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Enter Solana address..."
                className="w-full px-4 py-3 bg-(--color-surface-elevated) border border-(--color-border) rounded-xl text-base focus:outline-none focus:border-(--color-primary)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Amount (SOL)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                step="0.001"
                min="0"
                className="w-full px-4 py-3 bg-(--color-surface-elevated) border border-(--color-border) rounded-xl text-base focus:outline-none focus:border-(--color-primary)"
              />
            </div>
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!recipient || !amount}
            className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
            <span>Send SOL</span>
          </button>

          {/* Demo Notice */}
          <div className="flex items-start gap-3 p-4 bg-(--color-primary)/10 rounded-xl">
            <Info size={20} className="text-(--color-primary) shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-(--color-text-secondary)">
                This is a UI demo. Full transaction functionality can be implemented using the
                wallet adapter&apos;s{' '}
                <code className="text-[(--color-primary)]">signTransaction</code> method.
              </p>
            </div>
          </div>

          {/* Network Info */}
          <p className="text-center text-sm text-(--color-text-secondary)">Connected to Devnet</p>
        </div>
      </main>
    </>
  );
}
