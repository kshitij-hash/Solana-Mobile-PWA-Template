# Getting Started

Get up and running with the Solana Mobile PWA Template in minutes.

## Prerequisites

- **Node.js** 18.0.0 or higher
- **npm**, **yarn**, or **pnpm**
- A mobile device or emulator for testing

For TWA (Android app) builds:
- **Java JDK** 17 or higher
- **Android SDK** (or let Bubblewrap install it)

## Quick Start

### Option 1: Using the CLI (Recommended)

```bash
npx create-solana-pwa my-dapp
cd my-dapp
npm run dev
```

### Option 2: Clone from GitHub

```bash
git clone https://github.com/kshitij-hash/Solana-Mobile-PWA-Template.git my-dapp
cd my-dapp
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) on your mobile device or emulator.

## CLI Options

```bash
npx create-solana-pwa <project-name> [options]
```

| Option | Description |
|--------|-------------|
| `--network <net>` | Default network: mainnet, devnet, testnet |
| `--npm` | Use npm as package manager (default) |
| `--yarn` | Use yarn as package manager |
| `--pnpm` | Use pnpm as package manager |
| `--no-git` | Skip git initialization |

### Examples

```bash
# Create with devnet as default
npx create-solana-pwa my-dapp --network devnet

# Create using yarn
npx create-solana-pwa my-dapp --yarn
```

## What's Next?

After creating your project:

1. **Customize your app** - Edit pages in `src/app/`
2. **Update branding** - Modify `public/manifest.json` and icons
3. **Configure wallet** - Set network in `WalletProvider.tsx`
4. **Build for production** - Run `npm run build`
5. **Create Android app** - Follow the [TWA Guide](/twa/overview)

## Testing on Mobile

### Local Network Testing

1. Find your local IP: `ipconfig getifaddr en0` (Mac) or `hostname -I` (Linux)
2. Start dev server: `npm run dev`
3. Open `http://YOUR_IP:3000` on your mobile device

### PWA Installation

1. Open the app in Chrome on mobile
2. Tap the browser menu (three dots)
3. Select "Add to Home Screen"
4. The app installs as a standalone PWA

### MWA Testing

1. Install a Solana mobile wallet (Phantom, Solflare)
2. Open your PWA
3. Tap "Connect Wallet"
4. Approve the connection in your wallet app
