# Project Structure

Overview of the Solana Mobile PWA Template directory structure.

```
solana-mobile-pwa-template/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── layout.tsx                # Root layout with PWA meta tags
│   │   ├── page.tsx                  # Home page
│   │   ├── wallet/page.tsx           # Wallet details page
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
│   └── package.json                  # npm package config
│
└── package.json                      # Dependencies
```

## Key Directories

### `/src/app/`

Next.js 16 App Router pages. Each folder becomes a route:

- `/` → `page.tsx` (Home)
- `/wallet` → `wallet/page.tsx`
- `/send` → `send/page.tsx`
- `/settings` → `settings/page.tsx`

### `/src/components/`

Reusable React components organized by feature:

- **navigation/** - Header and bottom navigation
- **splash/** - Splash screen implementations
- **wallet/** - Wallet connection components
- **ui/** - Generic UI components

### `/public/`

Static assets served at root:

- **manifest.json** - PWA configuration
- **icons/** - App icons for all platforms
- **.well-known/** - Digital Asset Links for TWA

### `/twa/`

Android TWA (Trusted Web Activity) configuration:

- **twa-manifest.json** - Bubblewrap configuration
- **CustomLauncherActivity.java** - Chrome browser preference
- **scripts/** - Build automation

## Adding New Pages

1. Create a new folder in `src/app/`:

```bash
mkdir src/app/newpage
```

2. Add a `page.tsx`:

```tsx
// src/app/newpage/page.tsx
export default function NewPage() {
  return (
    <div>
      <h1>New Page</h1>
    </div>
  );
}
```

3. Add to bottom navigation in `BottomNav.tsx`:

```tsx
const navItems: NavItem[] = [
  // ... existing items
  {
    icon: <YourIcon size={24} />,
    label: 'New',
    href: '/newpage',
  },
];
```
