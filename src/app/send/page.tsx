'use client';

import { useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import {
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import { Header } from '@/components/navigation/Header';
import { WalletButton } from '@/components/wallet/WalletButton';
import { useToast } from '@/components/ui/Toast';
import { Send } from 'lucide-react';

export default function SendPage() {
  const { publicKey, connected, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const { showToast } = useToast();

  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending'>('idle');

  const handleSend = async () => {
    if (!publicKey || !recipient || !amount) return;

    setStatus('sending');

    try {
      // Validate recipient address
      const recipientPubkey = new PublicKey(recipient);

      // Create transaction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubkey,
          lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
        })
      );

      // Get recent blockhash
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      // Send transaction
      const signature = await sendTransaction(transaction, connection);

      showToast('Transaction submitted, confirming...', 'info');

      // Confirm transaction
      await connection.confirmTransaction(signature, 'confirmed');

      showToast(`Sent ${amount} SOL successfully!`, 'success');
      setRecipient('');
      setAmount('');
    } catch (error) {
      console.error('Transaction error:', error);
      showToast(
        error instanceof Error ? error.message : 'Transaction failed',
        'error'
      );
    } finally {
      setStatus('idle');
    }
  };

  if (!connected) {
    return (
      <>
        <Header title="Send SOL" showBack />
        <main className="main-content">
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <p className="text-[var(--color-text-secondary)] mb-6">
              Connect your wallet to send SOL
            </p>
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
              <label className="block text-sm font-medium mb-2">
                Recipient Address
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Enter Solana address..."
                className="w-full px-4 py-3 bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-xl text-base focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Amount (SOL)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                step="0.001"
                min="0"
                className="w-full px-4 py-3 bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-xl text-base focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!recipient || !amount || status === 'sending'}
            className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? (
              <>
                <div className="spinner" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send size={20} />
                <span>Send SOL</span>
              </>
            )}
          </button>

          {/* Network Warning */}
          <p className="text-center text-sm text-[var(--color-text-secondary)]">
            You are on Devnet. Transactions use test SOL.
          </p>
        </div>
      </main>
    </>
  );
}
