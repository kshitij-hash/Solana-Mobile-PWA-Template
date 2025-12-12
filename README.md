# Solana Mobile PWA Template

A production-ready, mobile-optimized Progressive Web App template for Solana with Mobile Wallet Adapter (MWA) integration.

[![npm version](https://img.shields.io/npm/v/create-solana-pwa?style=for-the-badge&logo=npm&color=CB3837)](https://www.npmjs.com/package/create-solana-pwa)
![Solana Mobile PWA](https://img.shields.io/badge/Solana-Mobile-9945FF?style=for-the-badge&logo=solana)
![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**[Live Demo](https://solana-pwa-template.vercel.app)** · **[Documentation](https://solana-pwa-docs.vercel.app)** · **[npm Package](https://www.npmjs.com/package/create-solana-pwa)**

## Quick Start

```bash
npx create-solana-pwa my-dapp
cd my-dapp
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) on your mobile device.

## Features

- **Mobile Wallet Adapter (MWA)** - Connect with Solana mobile wallets
- **PWA Ready** - Installable as native-like app
- **TWA Support** - Convert to Android app with Bubblewrap
- **Chrome Preference** - Custom TWA config for MWA compatibility
- **Mobile-First UI** - Safe areas, bottom nav, pull-to-refresh
- **Framer Motion** - Smooth animations
- **CLI Scaffolding** - Quick project setup

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Wallet | @solana-mobile/wallet-adapter-mobile |
| TWA | Bubblewrap CLI |

## Project Structure

```
my-dapp/
├── src/
│   ├── app/                 # Next.js pages
│   ├── components/          # React components
│   │   ├── navigation/      # Header, BottomNav
│   │   ├── wallet/          # WalletProvider, WalletButton
│   │   ├── splash/          # Splash screens
│   │   └── ui/              # Toast, PullToRefresh
│   └── styles/              # CSS files
├── public/
│   ├── manifest.json        # PWA manifest
│   └── .well-known/         # Asset links
├── twa/                     # TWA configuration
│   ├── twa-manifest.json
│   └── CustomLauncherActivity.java
└── package.json
```

## Build Commands

```bash
# Development
npm run dev

# Production
npm run build

# TWA (Android)
cd twa
bubblewrap init --manifest https://your-domain.com/manifest.json
bubblewrap build
```

## Documentation

Full documentation at **[solana-pwa-docs.vercel.app](https://solana-pwa-docs.vercel.app)**

- [Getting Started](https://solana-pwa-docs.vercel.app/guide/getting-started.html)
- [TWA Guide](https://solana-pwa-docs.vercel.app/twa/overview.html)
- [Components](https://solana-pwa-docs.vercel.app/components/overview.html)
- [CLI Options](https://solana-pwa-docs.vercel.app/cli/options.html)

## Resources

- [Solana Mobile Docs](https://docs.solanamobile.com)
- [Mobile Wallet Adapter](https://github.com/solana-mobile/mobile-wallet-adapter)
- [Bubblewrap CLI](https://github.com/GoogleChromeLabs/bubblewrap)

## License

MIT

---

Built for the Solana Mobile ecosystem.
