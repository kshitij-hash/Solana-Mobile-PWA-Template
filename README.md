# Solana Mobile PWA Template

A production-ready, mobile-optimized Progressive Web App template for Solana with Mobile Wallet Adapter (MWA) integration. Built for the Solana Mobile ecosystem.

[![npm version](https://img.shields.io/npm/v/create-solana-pwa?style=for-the-badge&logo=npm&color=CB3837)](https://www.npmjs.com/package/create-solana-pwa)
![Solana Mobile PWA](https://img.shields.io/badge/Solana-Mobile-9945FF?style=for-the-badge&logo=solana)
![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**[Live Demo](https://solana-pwa-template.vercel.app)** · **[npm Package](https://www.npmjs.com/package/create-solana-pwa)** · **[GitHub](https://github.com/kshitij-hash/Solana-Mobile-PWA-Template)**

## Features

- **Mobile Wallet Adapter (MWA)** - Seamless connection with Solana mobile wallets
- **Hybrid Splash Screen** - Native + PWA animated splash for smooth app launch
- **Chrome Browser Preference** - Custom TWA config that defaults to Chrome
- **Safe Area Support** - Proper handling of notches, gesture bars, and curved edges
- **Bottom Navigation** - Mobile-intuitive navigation with 48dp+ touch targets
- **Pull-to-Refresh** - Native-feeling gesture support
- **Framer Motion Animations** - Smooth, performant UI animations
- **PWA Ready** - Installable as a native-like app on any device
- **Bubblewrap Integration** - Complete TWA configuration for dApp Store publishing
- **CLI Scaffolding** - Quick project setup with `npx create-solana-pwa`

## Quick Start

### Using the CLI (Recommended)

```bash
npx create-solana-pwa my-dapp
cd my-dapp
npm run dev
```

### Manual Setup

```bash
# Clone the template
git clone https://github.com/kshitij-hash/Solana-Mobile-PWA-Template.git my-dapp
cd my-dapp

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) on your mobile device or emulator.

## Project Structure

```
solana-mobile-pwa-template/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── layout.tsx                # Root layout with PWA meta tags
│   │   ├── page.tsx                  # Home page
│   │   ├── wallet/page.tsx           # Wallet page
│   │   ├── send/page.tsx             # Send SOL page
│   │   └── settings/page.tsx         # Settings page
│   │
│   ├── components/
│   │   ├── navigation/
│   │   │   ├── BottomNav.tsx         # Mobile bottom navigation
│   │   │   └── Header.tsx            # Page header with back button
│   │   │
│   │   ├── splash/
│   │   │   ├── SplashScreen.tsx      # CSS-based splash screen
│   │   │   └── AnimatedSplashScreen.tsx  # Framer Motion splash
│   │   │
│   │   ├── wallet/
│   │   │   ├── WalletProvider.tsx    # Wallet context setup
│   │   │   └── WalletButton.tsx      # Connect/disconnect button
│   │   │
│   │   └── ui/
│   │       ├── Toast.tsx             # Toast notifications
│   │       ├── PullToRefresh.tsx     # Pull-to-refresh gesture
│   │       └── AnimatedComponents.tsx # Animation component library
│   │
│   ├── hooks/
│   │   ├── useSafeArea.ts            # Safe area insets hook
│   │   └── usePullToRefresh.ts       # Pull gesture hook
│   │
│   └── styles/
│       ├── mobile.css                # Mobile-first styles
│       └── splash.css                # Splash screen animations
│
├── public/
│   ├── manifest.json                 # PWA web manifest
│   ├── icons/                        # App icons (all sizes)
│   └── .well-known/
│       └── assetlinks.json           # Digital Asset Links for TWA
│
├── twa/                              # Bubblewrap TWA configuration
│   ├── twa-manifest.json             # TWA configuration
│   ├── CustomLauncherActivity.java   # Chrome preference activity
│   └── scripts/
│       └── build-twa.sh              # Build script
│
├── cli/                              # CLI scaffolding tool
│   ├── index.js                      # npx create-solana-pwa
│   ├── package.json                  # npm package config
│   └── README.md                     # CLI documentation
│
├── docs/
│   ├── SETUP.md                      # Detailed setup guide
│   ├── TWA-GUIDE.md                  # TWA/Bubblewrap guide
│   ├── CUSTOMIZATION.md              # Theming and customization
│   ├── PUBLISHING.md                 # dApp Store publishing guide
│   └── VIDEO-WALKTHROUGH.md          # Video tutorial scripts
│
├── PROPOSAL.md                       # RFP grant proposal
└── package.json                      # Dependencies
```

## Key Features Explained

### 1. Mobile Wallet Adapter (MWA)

The template includes full MWA integration for connecting to Solana mobile wallets:

```tsx
import { useWallet } from '@solana/wallet-adapter-react';

function MyComponent() {
  const { connected, publicKey, sendTransaction } = useWallet();
  // Your wallet logic here
}
```

### 2. Hybrid Splash Screen

Two-layer splash system for the best user experience:

1. **Native Layer**: Instant splash via Bubblewrap config (solid color + icon)
2. **PWA Layer**: Animated overlay that takes over once web content loads

```tsx
<SplashScreen
  onComplete={() => setShowSplash(false)}
  minDisplayTime={1500}
/>
```

### 3. Chrome Browser Preference

The `CustomLauncherActivity.java` forces Chrome as the TWA browser:

```java
@Override
protected String getProviderPackage() {
    for (String chromePackage : CHROME_PACKAGES) {
        if (isPackageInstalled(chromePackage)) {
            return chromePackage;
        }
    }
    return null; // Fall back to system default
}
```

### 4. Safe Area Handling

CSS variables for handling device-specific safe areas:

```css
:root {
  --sat: env(safe-area-inset-top);
  --sab: env(safe-area-inset-bottom);
  --sal: env(safe-area-inset-left);
  --sar: env(safe-area-inset-right);
}

.bottom-nav {
  padding-bottom: var(--sab);
  height: calc(56px + var(--sab));
}
```

## Building for Production

### Web Deployment

```bash
# Build the Next.js app
npm run build

# Deploy to Vercel, Netlify, or your preferred host
```

### TWA (Android App) Build

1. **Update configuration**:
   - Edit `twa/twa-manifest.json` with your app details
   - Update `public/.well-known/assetlinks.json` with your signing key fingerprint

2. **Build the TWA**:
   ```bash
   cd twa
   ./scripts/build-twa.sh
   ```

3. **Sign the APK**:
   ```bash
   jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 \
     -keystore ./keys/release.keystore \
     app/build/outputs/apk/release/app-release-unsigned.apk release
   ```

## Digital Asset Links Setup

For frameless TWA mode (no browser UI), configure Digital Asset Links:

1. Get your signing key fingerprint:
   ```bash
   keytool -list -v -keystore ./keys/release.keystore
   ```

2. Update `public/.well-known/assetlinks.json`:
   ```json
   [{
     "relation": ["delegate_permission/common.handle_all_urls"],
     "target": {
       "namespace": "android_app",
       "package_name": "com.example.solanapwa",
       "sha256_cert_fingerprints": ["YOUR_FINGERPRINT_HERE"]
     }
   }]
   ```

3. Deploy your PWA and ensure the file is accessible at:
   `https://your-domain.com/.well-known/assetlinks.json`

## Publishing to Solana dApp Store

1. Build your TWA APK (see above)
2. Follow the [Solana dApp Store submission guide](https://docs.solanamobile.com/dapp-publishing)
3. Submit via the publisher portal

## Customization

### Theming

Edit CSS variables in `src/styles/mobile.css`:

```css
:root {
  --color-primary: #9945FF;      /* Your brand color */
  --color-secondary: #14F195;    /* Accent color */
  --color-background: #0D0D0D;   /* Background */
}
```

### Navigation Items

Edit `src/components/navigation/BottomNav.tsx`:

```tsx
const navItems: NavItem[] = [
  { icon: <Home />, label: 'Home', href: '/' },
  { icon: <Wallet />, label: 'Wallet', href: '/wallet' },
  // Add your pages here
];
```

### Network Configuration

Edit `src/components/wallet/WalletProvider.tsx`:

```tsx
<WalletProvider network={WalletAdapterNetwork.Mainnet}>
  {children}
</WalletProvider>
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS Variables |
| Animations | Framer Motion |
| Wallet | @solana-mobile/wallet-adapter-mobile |
| Web3 | @solana/web3.js |
| Icons | Lucide React |
| TWA | Bubblewrap CLI (@bubblewrap/cli) |
| PWA | next-pwa |

## Animated Components

The template includes a comprehensive animation library built with Framer Motion:

```tsx
import {
  PageTransition,
  AnimatedCard,
  AnimatedButton,
  BottomSheet,
  AnimatedToast,
  AnimatedSpinner,
  Skeleton,
  AnimatedNumber,
  Presence,
} from '@/components/ui/AnimatedComponents';

// Page transitions
<PageTransition>
  <MyPage />
</PageTransition>

// Cards with hover effects
<AnimatedCard onClick={handleClick}>
  <CardContent />
</AnimatedCard>

// Bottom sheet modals
<BottomSheet isOpen={isOpen} onClose={handleClose}>
  <SheetContent />
</BottomSheet>
```

## Pull-to-Refresh

Native-feeling pull gesture support:

```tsx
import { PullToRefresh } from '@/components/ui/PullToRefresh';

<PullToRefresh onRefresh={async () => {
  await refetchData();
}}>
  <YourContent />
</PullToRefresh>
```

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a PR.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Resources

- [Solana Mobile Documentation](https://docs.solanamobile.com)
- [Mobile Wallet Adapter](https://github.com/solana-mobile/mobile-wallet-adapter)
- [Bubblewrap CLI](https://github.com/GoogleChromeLabs/bubblewrap)
- [TWA Quick Start](https://developer.chrome.com/docs/android/trusted-web-activity/quick-start)

---

Built with love for the Solana Mobile ecosystem.
