# Wallet Button

Connect/disconnect button for Solana wallets.

## Basic Usage

```tsx
import { WalletButton } from '@/components/wallet/WalletButton';

function Header() {
  return (
    <header>
      <h1>My App</h1>
      <WalletButton />
    </header>
  );
}
```

## Implementation

```tsx
// src/components/wallet/WalletButton.tsx
'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

export function WalletButton() {
  const { publicKey, connected, connecting, disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  if (connecting) {
    return (
      <button className="wallet-btn" disabled>
        Connecting...
      </button>
    );
  }

  if (connected && publicKey) {
    return (
      <button className="wallet-btn wallet-connected" onClick={disconnect}>
        {formatAddress(publicKey.toBase58())}
      </button>
    );
  }

  return (
    <button className="wallet-btn" onClick={() => setVisible(true)}>
      Connect Wallet
    </button>
  );
}

function formatAddress(address: string) {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}
```

## Styling

```css
.wallet-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  background: var(--color-primary);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.wallet-btn:hover {
  background: var(--color-primary-dark);
}

.wallet-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.wallet-connected {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
}

.wallet-connected:hover {
  background: var(--color-surface-elevated);
}
```

## With Icon

```tsx
import { Wallet } from 'lucide-react';

export function WalletButton() {
  // ... wallet hooks

  return (
    <button className="wallet-btn" onClick={handleClick}>
      <Wallet size={18} />
      <span>{connected ? formatAddress(publicKey) : 'Connect'}</span>
    </button>
  );
}
```

## Full-Featured Button

```tsx
export function WalletButton() {
  const { publicKey, connected, connecting, disconnect, wallet } = useWallet();
  const { setVisible } = useWalletModal();
  const [showMenu, setShowMenu] = useState(false);

  if (connecting) {
    return (
      <button className="wallet-btn" disabled>
        <Spinner size={16} />
        Connecting...
      </button>
    );
  }

  if (connected && publicKey) {
    return (
      <div className="wallet-dropdown">
        <button
          className="wallet-btn wallet-connected"
          onClick={() => setShowMenu(!showMenu)}
        >
          {wallet?.adapter.icon && (
            <img src={wallet.adapter.icon} alt="" width={20} height={20} />
          )}
          {formatAddress(publicKey.toBase58())}
        </button>

        {showMenu && (
          <div className="wallet-menu">
            <button onClick={() => copyAddress(publicKey.toBase58())}>
              Copy Address
            </button>
            <button onClick={() => setVisible(true)}>
              Change Wallet
            </button>
            <button onClick={disconnect}>
              Disconnect
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button className="wallet-btn" onClick={() => setVisible(true)}>
      <Wallet size={18} />
      Connect Wallet
    </button>
  );
}
```

## Dropdown Menu Styles

```css
.wallet-dropdown {
  position: relative;
}

.wallet-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  min-width: 180px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
  z-index: 100;
}

.wallet-menu button {
  width: 100%;
  padding: 12px 16px;
  text-align: left;
  background: none;
  border: none;
  color: var(--color-text-primary);
  cursor: pointer;
}

.wallet-menu button:hover {
  background: var(--color-surface-elevated);
}
```

## Custom Wallet Modal

Override the default modal:

```tsx
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

// Custom modal styles
import '@solana/wallet-adapter-react-ui/styles.css';
import './custom-wallet-modal.css';

function App() {
  return (
    <WalletModalProvider>
      {/* Your app */}
    </WalletModalProvider>
  );
}
```

```css
/* custom-wallet-modal.css */
.wallet-adapter-modal-wrapper {
  background: rgba(0, 0, 0, 0.8);
}

.wallet-adapter-modal-container {
  background: var(--color-surface);
  border-radius: 24px;
}

.wallet-adapter-modal-title {
  color: var(--color-text-primary);
}

.wallet-adapter-button {
  background: var(--color-surface-elevated);
  border-radius: 12px;
}
```

## States

Handle all connection states:

```tsx
function WalletStatus() {
  const { connected, connecting, disconnecting, publicKey } = useWallet();

  if (disconnecting) return <span>Disconnecting...</span>;
  if (connecting) return <span>Connecting...</span>;
  if (connected) return <span>Connected: {formatAddress(publicKey)}</span>;
  return <span>Not connected</span>;
}
```

## Error Handling

```tsx
function WalletButton() {
  const { connect } = useWallet();
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    try {
      setError(null);
      await connect();
    } catch (err) {
      setError('Failed to connect. Please try again.');
    }
  };

  return (
    <>
      <button onClick={handleConnect}>Connect</button>
      {error && <p className="error">{error}</p>}
    </>
  );
}
```

## Best Practices

1. **Show wallet icon** - Users recognize their wallet
2. **Truncate address** - Full address is too long
3. **Provide disconnect option** - Easy to switch wallets
4. **Handle all states** - connecting, connected, error
5. **Copy address feature** - Users often need this
