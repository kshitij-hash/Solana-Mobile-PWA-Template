'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Wallet, LogOut, Copy, Check } from 'lucide-react';
import { useState, useCallback } from 'react';

interface WalletButtonProps {
  className?: string;
}

export function WalletButton({ className = '' }: WalletButtonProps) {
  const { connected, connecting, publicKey, disconnect, wallet, connect } = useWallet();
  const { setVisible: showWalletSelectionModal } = useWalletModal();
  const [copied, setCopied] = useState(false);


  const copyAddress = useCallback(async () => {
    if (publicKey) {
      await navigator.clipboard.writeText(publicKey.toBase58());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [publicKey]);

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  // Simple connect handler - if wallet is selected, connect directly
  // Otherwise show modal to select a wallet
  const handleConnect = useCallback(async () => {
    if (wallet != null) {
      try {
        await connect();
      } catch (err) {
        console.error('[WalletButton] connect error:', err);
      }
    } else {
      showWalletSelectionModal(true);
    }
  }, [wallet, connect, showWalletSelectionModal]);

  if (connecting) {
    return (
      <button className={`btn btn-primary ${className}`} disabled>
        <div className="spinner" />
        <span>Connecting...</span>
      </button>
    );
  }

  if (connected && publicKey) {
    return (
      <div className="flex flex-col gap-3 w-full">
        {/* Address display */}
        <div className="card flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-(--color-primary) to-(--color-secondary) flex items-center justify-center">
              <Wallet size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-(--color-text-secondary)">Connected</p>
              <p className="wallet-address">{shortenAddress(publicKey.toBase58())}</p>
            </div>
          </div>
          <button
            onClick={copyAddress}
            className="touchable p-2 rounded-lg hover:bg-(--color-surface-elevated)"
            aria-label="Copy address"
          >
            {copied ? <Check size={20} className="text-(--color-secondary)" /> : <Copy size={20} />}
          </button>
        </div>

        {/* Disconnect button */}
        <button onClick={disconnect} className={`btn btn-secondary ${className}`}>
          <LogOut size={20} />
          <span>Disconnect</span>
        </button>
      </div>
    );
  }

  return (
    <button onClick={handleConnect} className={`btn btn-primary ${className}`}>
      <Wallet size={20} />
      <span>Connect Wallet</span>
    </button>
  );
}
