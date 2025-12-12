# Mobile Wallet Adapter

The template includes full Mobile Wallet Adapter (MWA) integration for connecting to Solana mobile wallets.

## How MWA Works

Mobile Wallet Adapter is a protocol that allows web apps to communicate with Solana wallet apps on mobile devices:

1. **Your dApp** initiates a connection request
2. **MWA** opens the wallet app via deep link
3. **User** approves in their wallet
4. **Wallet** returns the signed transaction to your dApp

## Using the Wallet

### Basic Usage

```tsx
import { useWallet } from '@solana/wallet-adapter-react';

function MyComponent() {
  const { connected, publicKey, sendTransaction } = useWallet();

  if (!connected) {
    return <WalletButton />;
  }

  return (
    <div>
      <p>Connected: {publicKey?.toBase58()}</p>
    </div>
  );
}
```

### Signing Transactions

```tsx
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

function SendSol() {
  const { publicKey, signTransaction } = useWallet();
  const { connection } = useConnection();

  const handleSend = async () => {
    if (!publicKey || !signTransaction) return;

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: recipientAddress,
        lamports: 0.1 * LAMPORTS_PER_SOL,
      })
    );

    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;
    transaction.feePayer = publicKey;

    // Sign with MWA
    const signed = await signTransaction(transaction);

    // Send the signed transaction
    const signature = await connection.sendRawTransaction(signed.serialize());

    await connection.confirmTransaction(signature);
  };

  return <button onClick={handleSend}>Send 0.1 SOL</button>;
}
```

## Configuration

### App Identity

Configure your app's identity in `WalletProvider.tsx`:

```tsx
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

### Authorization Caching

Control how long authorization is cached:

```tsx
new SolanaMobileWalletAdapter({
  appIdentity: { /* ... */ },
  cluster: network,
  authorizationResultCache: {
    // Disable caching (reconnect each time)
    clear: async () => {},
    get: async () => null,
    set: async () => {},
  },
});
```

## Wallet Connection Flow

```tsx
import { useWallet } from '@solana/wallet-adapter-react';

function ConnectButton() {
  const { connect, disconnect, connected, connecting } = useWallet();

  if (connecting) {
    return <button disabled>Connecting...</button>;
  }

  if (connected) {
    return <button onClick={disconnect}>Disconnect</button>;
  }

  return <button onClick={connect}>Connect Wallet</button>;
}
```

## Error Handling

Handle MWA-specific errors:

```tsx
import { useWallet } from '@solana/wallet-adapter-react';

function TransactionComponent() {
  const { signTransaction } = useWallet();

  const handleTransaction = async () => {
    try {
      const signed = await signTransaction(transaction);
      // Success
    } catch (error) {
      if (error.name === 'WalletNotConnectedError') {
        console.log('Wallet not connected');
      } else if (error.name === 'WalletSignTransactionError') {
        console.log('User rejected transaction');
      } else {
        console.error('Transaction error:', error);
      }
    }
  };
}
```

## Supported Wallets

MWA works with any Solana mobile wallet that implements the protocol:

- **Phantom** - Popular multi-chain wallet
- **Solflare** - Solana-native wallet
- **Backpack** - Multi-chain with xNFT support
- **Glow** - Simple Solana wallet

## Testing

### On Emulator

1. Install a wallet APK on the emulator
2. Create/import a wallet with devnet SOL
3. Test your dApp's connection flow

### On Device

1. Install wallet from Play Store
2. Connect to the same network as your dApp
3. Test with real transactions on devnet

## Best Practices

1. **Always handle disconnection** - Users may disconnect from the wallet app
2. **Show loading states** - MWA operations require user interaction
3. **Handle rejections gracefully** - Users can cancel at any time
4. **Use devnet for testing** - Never test with mainnet funds
5. **Cache authorization appropriately** - Balance UX vs security
