# Configuration

Configure the Solana Mobile PWA Template for your project.

## Environment Variables

Create a `.env.local` file for environment-specific settings:

```bash
# Solana Network (mainnet-beta, devnet, testnet)
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta

# Custom RPC Endpoint (optional - uses default if not set)
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
  "background_color": "#0a0a0a",
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
    },
    {
      "src": "/icons/icon-maskable-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

### Key Fields

| Field | Description |
|-------|-------------|
| `name` | Full app name (displayed in install prompts) |
| `short_name` | Short name (displayed on home screen, max 12 chars) |
| `display` | `standalone` for app-like experience |
| `theme_color` | Status bar color on mobile |
| `background_color` | Splash screen background |
| `orientation` | Lock to `portrait-primary` for mobile-first |

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

For better performance or rate limits, use a custom RPC:

```tsx
const endpoint = useMemo(() => {
  if (process.env.NEXT_PUBLIC_RPC_ENDPOINT) {
    return process.env.NEXT_PUBLIC_RPC_ENDPOINT;
  }
  return clusterApiUrl(network);
}, [network]);
```

Popular RPC providers:
- [Helius](https://helius.xyz)
- [QuickNode](https://quicknode.com)
- [Triton](https://triton.one)

## Next.js Configuration

The `next.config.ts` includes PWA settings:

```ts
import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default withPWA(nextConfig);
```

### Service Worker

The service worker is automatically generated in production. It caches:
- Static assets (JS, CSS, images)
- App shell for offline access
- API responses (configurable)

## TWA Configuration

For Android TWA settings, see the [TWA Setup Guide](/twa/setup).
