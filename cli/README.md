# create-solana-pwa

Create a new Solana Mobile PWA project with Mobile Wallet Adapter (MWA) integration.

[![npm version](https://img.shields.io/npm/v/create-solana-pwa?style=flat-square)](https://www.npmjs.com/package/create-solana-pwa)

## Quick Start

```bash
npx create-solana-pwa my-dapp
cd my-dapp
npm run dev
```

## Usage

```bash
npx create-solana-pwa <project-name> [options]
```

### Options

| Option | Description |
|--------|-------------|
| `--network <net>` | Default network: mainnet, devnet, testnet (default: mainnet) |
| `--npm` | Use npm as package manager (default) |
| `--yarn` | Use yarn as package manager |
| `--pnpm` | Use pnpm as package manager |
| `--no-git` | Skip git initialization |
| `--help` | Show help message |

### Examples

```bash
# Create with default settings
npx create-solana-pwa my-dapp

# Create with devnet as default network
npx create-solana-pwa my-dapp --network devnet

# Create using yarn
npx create-solana-pwa my-dapp --yarn

# Create without git initialization
npx create-solana-pwa my-dapp --no-git
```

## What's Included

- **Next.js 16** with App Router
- **TypeScript** configuration
- **Mobile Wallet Adapter** integration
- **PWA** with service worker caching
- **Framer Motion** animations
- **Safe area handling** for mobile devices
- **Bottom navigation** with 48dp touch targets
- **Pull-to-refresh** gesture support
- **TWA scripts** for building Android APK (Solana dApp Store ready)

## Building TWA (Android App)

After creating your project:

```bash
cd my-dapp/twa
./scripts/init-twa.sh
```

This interactive script will:
- Configure your app (name, package ID, host URL)
- Generate signing keystore
- Update Digital Asset Links (assetlinks.json)
- Build signed APK ready for Solana dApp Store

## Documentation

Full documentation: **https://solana-pwa-docs.vercel.app**

- [Getting Started](https://solana-pwa-docs.vercel.app/guide/getting-started.html)
- [TWA Guide](https://solana-pwa-docs.vercel.app/twa/overview.html)
- [Components](https://solana-pwa-docs.vercel.app/components/overview.html)
- [CLI Options](https://solana-pwa-docs.vercel.app/cli/options.html)

## Links

- [Live Demo](https://solana-pwa-template.vercel.app)
- [GitHub](https://github.com/kshitij-hash/Solana-Mobile-PWA-Template)
- [Solana Mobile Docs](https://docs.solanamobile.com)

## License

MIT
