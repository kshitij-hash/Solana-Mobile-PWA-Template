# create-solana-pwa

Create a new Solana Mobile PWA project with Mobile Wallet Adapter (MWA) integration.

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

The generated project includes:

- **Next.js 14** with App Router
- **TypeScript** configuration
- **Mobile Wallet Adapter** integration
- **PWA** with service worker caching
- **Framer Motion** animations
- **Safe area handling** for mobile devices (notches, gesture bars)
- **Bottom navigation** with 48dp touch targets
- **Pull-to-refresh** gesture support
- **Bubblewrap TWA** configuration for Android app
- **Chrome browser preference** for TWA

## Project Structure

```
my-dapp/
├── src/
│   ├── app/                    # Next.js App Router pages
│   ├── components/
│   │   ├── navigation/         # Header, BottomNav
│   │   ├── wallet/             # WalletProvider, WalletButton
│   │   ├── splash/             # SplashScreen, AnimatedSplashScreen
│   │   └── ui/                 # Toast, PullToRefresh, AnimatedComponents
│   ├── hooks/                  # Custom React hooks
│   └── styles/                 # Mobile-first CSS
├── public/
│   ├── manifest.json           # PWA manifest
│   └── .well-known/            # Digital Asset Links
├── twa/                        # TWA configuration
│   ├── twa-manifest.json
│   └── scripts/build-twa.sh
├── cli/                        # This CLI tool
└── docs/                       # Documentation
```

## Next Steps

After creating your project:

1. **Run the development server**
   ```bash
   npm run dev
   ```

2. **Customize your app**
   - Edit `src/app/page.tsx` for the home page
   - Update `public/manifest.json` with your app details
   - Modify styles in `src/styles/mobile.css`

3. **Build for production**
   ```bash
   npm run build
   npm run start
   ```

4. **Create Android app (TWA)**
   ```bash
   cd twa
   ./scripts/build-twa.sh
   ```

5. **Publish to Solana dApp Store**
   - See `docs/PUBLISHING.md` for instructions

## Documentation

- [Solana Mobile Docs](https://docs.solanamobile.com)
- [Mobile Wallet Adapter](https://github.com/solana-mobile/mobile-wallet-adapter)
- [PWA Setup Guide](../docs/SETUP.md)
- [TWA Guide](../docs/TWA-GUIDE.md)
- [Publishing Guide](../docs/PUBLISHING.md)

## License

MIT
