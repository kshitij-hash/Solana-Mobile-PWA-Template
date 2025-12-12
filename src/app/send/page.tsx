'use client';

import { useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import {
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js';
import { Header } from '@/components/navigation/Header';
import { WalletButton } from '@/components/wallet/WalletButton';
import { useToast } from '@/components/ui/Toast';
import { useNetwork } from '@/contexts/NetworkContext';
import { Send, Loader2, ExternalLink } from 'lucide-react';
import useGuardedCallback from '@/hooks/useGuardedCallback';

export default function SendPage() {
  const { publicKey, signTransaction, connected, wallet } = useWallet();
  const { connection } = useConnection();
  const { showToast } = useToast();
  const { networkName, isMainnet } = useNetwork();

  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [sending, setSending] = useState(false);
  const [lastTxSignature, setLastTxSignature] = useState<string | null>(null);

  // Check if wallet supports versioned transactions (like official example)
  const supportedTxnVersions = wallet?.adapter.supportedTransactionVersions;
  const transactionVersion = supportedTxnVersions?.has(0) ? 0 : 'legacy';

  const validateAddress = (address: string): boolean => {
    try {
      new PublicKey(address);
      return true;
    } catch {
      return false;
    }
  };

  // Use signTransaction + sendRawTransaction instead of sendTransaction
  // This works better with MWA as signTransaction triggers the wallet dialog
  const sendTransactionGuarded = useGuardedCallback(
    async (recipientAddress: string, lamports: number) => {
      if (!publicKey || !signTransaction) {
        throw new Error('Wallet not connected');
      }

      const recipientPubkey = new PublicKey(recipientAddress);

      // Get latest blockhash with context
      const {
        value: { blockhash, lastValidBlockHeight },
      } = await connection.getLatestBlockhashAndContext();

      const transferInstruction = SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: recipientPubkey,
        lamports,
      });

      let transaction: Transaction | VersionedTransaction;

      // Use legacy or versioned transaction based on wallet support
      if (transactionVersion === 'legacy') {
        transaction = new Transaction({
          blockhash,
          lastValidBlockHeight,
          feePayer: publicKey,
        }).add(transferInstruction);
      } else {
        const message = new TransactionMessage({
          payerKey: publicKey,
          recentBlockhash: blockhash,
          instructions: [transferInstruction],
        });
        transaction = new VersionedTransaction(message.compileToV0Message());
      }

      // Sign the transaction using MWA
      const signedTransaction = await signTransaction(transaction);

      // Serialize and send the signed transaction
      const serializedTransaction = signedTransaction.serialize();
      const signature = await connection.sendRawTransaction(serializedTransaction, {
        skipPreflight: false,
        preflightCommitment: 'confirmed',
      });

      // Wait for confirmation
      await connection.confirmTransaction({
        blockhash,
        lastValidBlockHeight,
        signature,
      });

      return signature;
    },
    [connection, publicKey, signTransaction, transactionVersion]
  );

  const handleSend = async () => {
    if (!publicKey || !signTransaction) {
      showToast('Wallet not connected', 'error');
      return;
    }

    if (!recipient || !amount) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    if (!validateAddress(recipient)) {
      showToast('Invalid Solana address', 'error');
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      showToast('Invalid amount', 'error');
      return;
    }

    setSending(true);
    setLastTxSignature(null);

    try {
      const lamports = Math.round(amountNum * LAMPORTS_PER_SOL);
      const signature = await sendTransactionGuarded(recipient, lamports);

      if (signature) {
        setLastTxSignature(signature);
        showToast(`Sent ${amount} SOL successfully!`, 'success');
        setRecipient('');
        setAmount('');
      }
    } catch (error) {
      console.error('Transaction failed:', error);
      const message = error instanceof Error ? error.message : 'Transaction failed';
      showToast(message, 'error');
    } finally {
      setSending(false);
    }
  };

  const getExplorerUrl = (signature: string) => {
    const cluster = isMainnet ? '' : `?cluster=${networkName.toLowerCase()}`;
    return `https://explorer.solana.com/tx/${signature}${cluster}`;
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
                disabled={sending}
                className="w-full px-4 py-3 bg-(--color-surface-elevated) border border-(--color-border) rounded-xl text-base focus:outline-none focus:border-(--color-primary) disabled:opacity-50"
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
                disabled={sending}
                className="w-full px-4 py-3 bg-(--color-surface-elevated) border border-(--color-border) rounded-xl text-base focus:outline-none focus:border-(--color-primary) disabled:opacity-50"
              />
            </div>
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!recipient || !amount || sending}
            className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send size={20} />
                <span>Send SOL</span>
              </>
            )}
          </button>

          {/* Last Transaction */}
          {lastTxSignature && (
            <div className="card bg-(--color-secondary)/10 border-(--color-secondary)/20">
              <p className="text-sm font-medium text-(--color-secondary) mb-2">
                Transaction Successful!
              </p>
              <a
                href={getExplorerUrl(lastTxSignature)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-(--color-text-secondary) hover:text-(--color-secondary) transition-colors"
              >
                <span className="font-mono truncate">{lastTxSignature.slice(0, 20)}...</span>
                <ExternalLink size={14} className="shrink-0" />
              </a>
            </div>
          )}

          {/* Network Info */}
          <p className="text-center text-sm text-(--color-text-secondary)">
            Connected to {networkName}
          </p>
        </div>
      </main>
    </>
  );
}
