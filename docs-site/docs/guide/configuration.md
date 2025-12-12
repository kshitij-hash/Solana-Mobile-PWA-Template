# Configuration

Configure the Solana Mobile PWA Template for your project.

## Environment Variables

Create a `.env.local` file for environment-specific settings:

```bash
# Solana Network (mainnet-beta, devnet, testnet)
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta

# RPC Endpoint (optional - uses default if not set)
NEXT_PUBLIC_RPC_ENDPOINT=https://api.mainnet-beta.solana.com
```

## PWA Manifest

Edit `public/manifest.json` to customize your PWA:

```json
{
  "name": "Your App Name",
  "short_name": "YourApp",
  "description": "Your app description",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#9945FF",
  "theme_color": "#9945FF",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Key Fields

| Field | Description |
|-------|-------------|
| `name` | Full app name (displayed in app stores) |
| `short_name` | Short name (displayed on home screen) |
| `display` | `standalone` for app-like experience |
| `theme_color` | Status bar color on mobile |
| `background_color` | Splash screen background |

## Network Configuration

Edit `src/components/wallet/WalletProvider.tsx`:

```tsx
// Change network here
const network = WalletAdapterNetwork.Mainnet; // or Devnet, Testnet

// Or use environment variable
const network = (process.env.NEXT_PUBLIC_SOLANA_NETWORK as WalletAdapterNetwork)
  || WalletAdapterNetwork.Mainnet;
```

### Custom RPC Endpoint

```tsx
const endpoint = useMemo(() => {
  // Use custom RPC endpoint
  if (process.env.NEXT_PUBLIC_RPC_ENDPOINT) {
    return process.env.NEXT_PUBLIC_RPC_ENDPOINT;
  }
  // Fall back to default
  return clusterApiUrl(network);
}, [network]);
```

## TWA Configuration

Edit `twa/twa-manifest.json` for Android app settings:

```json
{
  "packageId": "com.yourcompany.yourapp",
  "host": "your-domain.com",
  "name": "Your App Name",
  "launcherName": "Your App",
  "display": "standalone",
  "themeColor": "#9945FF",
  "backgroundColor": "#0a0a0a",
  "startUrl": "/",
  "iconUrl": "/icons/icon-512x512.png"
}
```

See the [TWA Guide](/twa/overview) for detailed configuration.

## Next.js Configuration

The `next.config.js` includes PWA and optimization settings:

```js
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  reactStrictMode: true,
  // Add your custom Next.js config here
});
```

## Build Configuration

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run start
```

### Static Export (Optional)

For static hosting without a Node.js server:

```js
// next.config.js
module.exports = {
  output: 'export',
  // ... other config
};
```

Then run:

```bash
npm run build
# Output in 'out' directory
```
