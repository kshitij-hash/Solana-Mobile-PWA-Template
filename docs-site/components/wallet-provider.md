# Wallet Provider

Solana wallet context wrapper with MWA support.

## Setup

The provider is configured in `src/components/wallet/WalletProvider.tsx`:

```tsx
import { WalletProvider } from '@/components/wallet/WalletProvider';

export default function RootLayout({ children }) {
  return (
    <WalletProvider>
      {children}
    </WalletProvider>
  );
}
```

## Implementation

```tsx
// src/components/wallet/WalletProvider.tsx
'use client';

import { useMemo } from 'react';
import {
  ConnectionProvider,
  WalletProvider as SolanaWalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl } from '@solana/web3.js';
import { SolanaMobileWalletAdapter } from '@solana-mobile/wallet-adapter-mobile';

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const network = WalletAdapterNetwork.Mainnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new SolanaMobileWalletAdapter({
        appIdentity: {
          name: 'Solana Mobile PWA',
          uri: typeof window !== 'undefined' ? window.location.origin : '',
          icon: '/icons/icon-192x192.png',
        },
        cluster: network,
      }),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
}
```

## Configuration

### Network

```tsx
// Mainnet
const network = WalletAdapterNetwork.Mainnet;

// Devnet (for testing)
const network = WalletAdapterNetwork.Devnet;

// Testnet
const network = WalletAdapterNetwork.Testnet;
```

### Custom RPC

```tsx
const endpoint = useMemo(() => {
  // Use custom RPC
  return 'https://your-rpc-endpoint.com';

  // Or use environment variable
  return process.env.NEXT_PUBLIC_RPC_ENDPOINT || clusterApiUrl(network);
}, [network]);
```

### App Identity

Configure how your app appears in wallets:

```tsx
new SolanaMobileWalletAdapter({
  appIdentity: {
    name: 'Your App Name',    // Shown in wallet
    uri: window.location.origin,
    icon: '/icons/icon-192x192.png',
  },
  cluster: network,
})
```

### Authorization Cache

Control session persistence:

```tsx
new SolanaMobileWalletAdapter({
  appIdentity: { /* ... */ },
  authorizationResultCache: {
    // Disable caching (fresh connection each time)
    clear: async () => {},
    get: async () => null,
    set: async () => {},
  },
})
```

## Using the Wallet

### useWallet Hook

```tsx
import { useWallet } from '@solana/wallet-adapter-react';

function MyComponent() {
  const {
    publicKey,          // PublicKey | null
    connected,          // boolean
    connecting,         // boolean
    disconnecting,      // boolean
    connect,            // () => Promise<void>
    disconnect,         // () => Promise<void>
    select,             // (walletName) => void
    signTransaction,    // (tx) => Promise<Transaction>
    signAllTransactions,// (txs) => Promise<Transaction[]>
    signMessage,        // (message) => Promise<Uint8Array>
  } = useWallet();

  // ...
}
```

### useConnection Hook

```tsx
import { useConnection } from '@solana/wallet-adapter-react';

function MyComponent() {
  const { connection } = useConnection();

  // Get balance
  const balance = await connection.getBalance(publicKey);

  // Send transaction
  const signature = await connection.sendRawTransaction(tx.serialize());
}
```

## Error Handling

```tsx
import { WalletError } from '@solana/wallet-adapter-base';

try {
  await connect();
} catch (error) {
  if (error instanceof WalletError) {
    switch (error.name) {
      case 'WalletNotReadyError':
        // Wallet not installed
        break;
      case 'WalletConnectionError':
        // Connection failed
        break;
      case 'WalletDisconnectedError':
        // User disconnected
        break;
    }
  }
}
```

## Auto Connect

Enable automatic reconnection:

```tsx
<SolanaWalletProvider wallets={wallets} autoConnect>
```

Disable for manual control:

```tsx
<SolanaWalletProvider wallets={wallets} autoConnect={false}>
```

## Multiple Wallets

Add additional wallet adapters:

```tsx
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';

const wallets = useMemo(
  () => [
    new SolanaMobileWalletAdapter({ /* ... */ }),
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
  ],
  [network]
);
```

## SSR Compatibility

The provider handles SSR by checking for `window`:

```tsx
const wallets = useMemo(
  () => [
    new SolanaMobileWalletAdapter({
      appIdentity: {
        uri: typeof window !== 'undefined' ? window.location.origin : '',
        // ...
      },
    }),
  ],
  []
);
```

## Best Practices

1. **Use mainnet for production** - Test on devnet first
2. **Handle all wallet states** - connecting, connected, disconnected
3. **Show loading states** - Wallet operations take time
4. **Cache carefully** - Consider security vs UX
5. **Test on real devices** - MWA behaves differently than desktop
