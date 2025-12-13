# Mobile Wallet Adapter

The template includes Mobile Wallet Adapter (MWA) integration for connecting to Solana wallets on mobile devices.

## How MWA Works

Mobile Wallet Adapter is a protocol that allows web apps to communicate with Solana wallet apps:

```
┌─────────────┐    Deep Link    ┌─────────────┐
│   Your dApp │ ──────────────► │   Wallet    │
│             │                 │   (Phantom) │
│             │ ◄────────────── │             │
└─────────────┘   Signed Tx     └─────────────┘
```

1. **Your dApp** initiates a connection/signing request
2. **MWA** opens the wallet app via deep link
3. **User** approves in their wallet
4. **Wallet** returns the result to your dApp

## Basic Usage

```tsx
import { useWallet } from '@solana/wallet-adapter-react';

function MyComponent() {
  const { connected, publicKey } = useWallet();

  if (!connected) {
    return <WalletButton />;
  }

  return <p>Connected: {publicKey?.toBase58()}</p>;
}
```

## Sending Transactions

```tsx
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import {
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  PublicKey
} from '@solana/web3.js';

function SendSol() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const handleSend = async (recipient: string, amount: number) => {
    if (!publicKey) return;

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey(recipient),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );

    const signature = await sendTransaction(transaction, connection);
    await connection.confirmTransaction(signature, 'confirmed');

    console.log('Transaction confirmed:', signature);
  };

  return (
    <button onClick={() => handleSend('recipient...', 0.1)}>
      Send 0.1 SOL
    </button>
  );
}
```

## Signing Messages

```tsx
import { useWallet } from '@solana/wallet-adapter-react';

function SignMessage() {
  const { publicKey, signMessage } = useWallet();

  const handleSign = async () => {
    if (!publicKey || !signMessage) return;

    const message = new TextEncoder().encode('Hello, Solana!');
    const signature = await signMessage(message);

    console.log('Signature:', signature);
  };

  return <button onClick={handleSign}>Sign Message</button>;
}
```

## App Identity

Configure your app's identity in `WalletProvider.tsx`:

```tsx
import { SolanaMobileWalletAdapter } from '@solana-mobile/wallet-adapter-mobile';

const wallets = useMemo(
  () => [
    new SolanaMobileWalletAdapter({
      appIdentity: {
        name: 'Your App Name',
        uri: window.location.origin,
        icon: '/icons/icon-192x192.png',
      },
      cluster: network,
    }),
  ],
  [network]
);
```

This identity is shown to users when they connect or sign transactions.

## Error Handling

```tsx
import { useWallet } from '@solana/wallet-adapter-react';

function TransactionButton() {
  const { sendTransaction } = useWallet();

  const handleTransaction = async () => {
    try {
      const signature = await sendTransaction(transaction, connection);
      // Success
    } catch (error: any) {
      if (error.name === 'WalletNotConnectedError') {
        console.log('Please connect your wallet');
      } else if (error.name === 'WalletSignTransactionError') {
        console.log('Transaction was rejected');
      } else {
        console.error('Transaction failed:', error.message);
      }
    }
  };
}
```

## Connection States

```tsx
import { useWallet } from '@solana/wallet-adapter-react';

function WalletStatus() {
  const { connected, connecting, disconnecting, publicKey } = useWallet();

  if (connecting) return <span>Connecting...</span>;
  if (disconnecting) return <span>Disconnecting...</span>;
  if (connected) return <span>Connected: {publicKey?.toBase58().slice(0, 8)}...</span>;

  return <span>Not connected</span>;
}
```

## Best Practices

1. **Handle all states** - Show loading during `connecting` and `disconnecting`
2. **Graceful rejections** - Users can cancel at any time
3. **Use devnet for testing** - Never test with real funds
4. **Show transaction status** - Confirm transactions before showing success
5. **Mobile-first UX** - Large touch targets, clear feedback

## Testing

### On Device

1. Install a Solana wallet (Phantom, Solflare) from Play Store
2. Create or import a wallet
3. Switch to devnet in wallet settings
4. Get devnet SOL from a [faucet](https://faucet.solana.com)
5. Test your dApp's connection and signing flows

### On Emulator

1. Install wallet APK on emulator
2. Configure wallet for devnet
3. Test connection flow

::: tip
MWA requires Chrome on Android for best compatibility. See [Chrome Preference](/twa/chrome-preference) for TWA setup.
:::
