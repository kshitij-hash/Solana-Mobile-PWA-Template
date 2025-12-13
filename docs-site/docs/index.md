---
layout: home

hero:
  name: "Solana Mobile PWA"
  text: "Production-Ready Template"
  tagline: Build mobile-first Solana dApps with PWA + MWA integration
  image:
    src: /logo.svg
    alt: Solana Mobile PWA
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/kshitij-hash/Solana-Mobile-PWA-Template
    - theme: alt
      text: Live Demo
      link: https://solana-pwa-template.vercel.app

features:
  - icon: 📱
    title: Mobile Wallet Adapter
    details: Seamless integration with Solana mobile wallets using MWA for secure transactions.
  - icon: ⚡
    title: PWA Ready
    details: Installable as a native-like app with offline support and home screen presence.
  - icon: 🤖
    title: TWA Support
    details: Convert to Android app with interactive setup script for Solana dApp Store publishing.
  - icon: 🎨
    title: Mobile-First UI
    details: Splash screens, bottom navigation, safe areas, pull-to-refresh, and smooth animations.
  - icon: 🛠️
    title: CLI Scaffolding
    details: Quick project setup with npx create-solana-pwa - get started in seconds.
  - icon: 📖
    title: Comprehensive Docs
    details: Detailed guides for setup, customization, TWA building, and dApp Store publishing.
---

## Quick Start

```bash
npx create-solana-pwa my-dapp
cd my-dapp
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) on your mobile device or emulator.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Wallet | @solana-mobile/wallet-adapter-mobile |
| Web3 | @solana/web3.js |
| TWA | Bubblewrap CLI |
| PWA | next-pwa |

## What's Included

- **Mobile Wallet Adapter (MWA)** - Connect to Solana mobile wallets
- **Hybrid Splash Screen** - Native + PWA animated splash
- **Chrome Browser Preference** - Automatic via android-browser-helper
- **Safe Area Support** - Handle notches, gesture bars, curved edges
- **Bottom Navigation** - Mobile-intuitive with 48dp+ touch targets
- **Pull-to-Refresh** - Native-feeling gesture support
- **Framer Motion Animations** - Smooth, performant UI transitions
- **TWA Scripts** - Interactive setup and build scripts for dApp Store
