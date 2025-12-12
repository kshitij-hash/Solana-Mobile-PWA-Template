# Customization Guide

How to customize the Solana Mobile PWA Template for your brand.

## Theming

### Colors

Edit CSS variables in `src/styles/mobile.css`:

```css
:root {
  /* Primary brand color */
  --color-primary: #9945ff;
  --color-primary-dark: #7c3acd;

  /* Accent color */
  --color-secondary: #14f195;

  /* Background colors */
  --color-background: #0d0d0d;
  --color-surface: #1a1a1a;
  --color-surface-elevated: #242424;

  /* Text colors */
  --color-text-primary: #ffffff;
  --color-text-secondary: #a0a0a0;

  /* Border color */
  --color-border: #333333;
}
```

### Light Mode

The template supports automatic light mode. Customize in `mobile.css`:

```css
@media (prefers-color-scheme: light) {
  :root {
    --color-background: #ffffff;
    --color-surface: #f5f5f5;
    --color-surface-elevated: #ebebeb;
    --color-text-primary: #0d0d0d;
    --color-text-secondary: #666666;
    --color-border: #e0e0e0;
  }
}
```

## Branding

### App Name

Update in multiple places:

1. **PWA Manifest** (`public/manifest.json`):
```json
{
  "name": "Your App Name",
  "short_name": "YourApp"
}
```

2. **TWA Manifest** (`twa/twa-manifest.json`):
```json
{
  "name": "Your App Name",
  "launcherName": "YourApp"
}
```

3. **Splash Screen** (`src/components/splash/SplashScreen.tsx`):
```tsx
<h1 className="splash-title">Your App Name</h1>
```

4. **HTML Title** (`src/app/layout.tsx`):
```tsx
export const metadata = {
  title: 'Your App Name',
  description: 'Your app description',
};
```

### App Icons

Replace icons in `public/icons/`:

| File | Size | Purpose |
|------|------|---------|
| `icon-72x72.png` | 72x72 | Android small |
| `icon-96x96.png` | 96x96 | Android medium |
| `icon-128x128.png` | 128x128 | Chrome Web Store |
| `icon-144x144.png` | 144x144 | Android medium-high |
| `icon-152x152.png` | 152x152 | iOS |
| `icon-192x192.png` | 192x192 | Android |
| `icon-384x384.png` | 384x384 | Android large |
| `icon-512x512.png` | 512x512 | PWA install, splash |
| `icon-maskable-512x512.png` | 512x512 | Android adaptive icon |

**Tip:** Use a tool like [maskable.app](https://maskable.app) to create maskable icons.

### Splash Screen Logo

Replace the SVG in `src/components/splash/SplashScreen.tsx`:

```tsx
function YourLogo() {
  return (
    <svg viewBox="0 0 100 100">
      {/* Your logo SVG paths */}
    </svg>
  );
}
```

Or use an image:
```tsx
<img src="/icons/icon-512x512.png" alt="Logo" width={80} height={80} />
```

## Navigation

### Bottom Nav Items

Edit `src/components/navigation/BottomNav.tsx`:

```tsx
const navItems: NavItem[] = [
  {
    icon: <Home size={24} strokeWidth={1.5} />,
    activeIcon: <Home size={24} strokeWidth={2} />,
    label: 'Home',
    href: '/',
  },
  {
    icon: <Wallet size={24} strokeWidth={1.5} />,
    activeIcon: <Wallet size={24} strokeWidth={2} />,
    label: 'Portfolio',  // Custom label
    href: '/wallet',
  },
  // Add or remove items here
];
```

### Add New Pages

1. Create page file: `src/app/newpage/page.tsx`
2. Add to navigation in `BottomNav.tsx`

### Header

Customize `src/components/navigation/Header.tsx`:

```tsx
export function Header({ title, showBack = false }) {
  return (
    <header className="header">
      {showBack && <BackButton />}
      <h1>{title}</h1>
      {/* Add custom elements */}
    </header>
  );
}
```

## Wallet Configuration

### Network

Edit `src/components/wallet/WalletProvider.tsx`:

```tsx
// Options: Mainnet, Devnet, Testnet
const network = WalletAdapterNetwork.Devnet;
```

### RPC Endpoint

```tsx
const endpoint = useMemo(() => {
  // Custom RPC endpoint
  return 'https://your-rpc-endpoint.com';
  // Or use default
  // return clusterApiUrl(network);
}, [network]);
```

### Wallet Adapters

Add or remove wallet adapters:

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
    // Add other wallets if needed
  ],
  [network]
);
```

## Splash Screen

### Display Time

Edit `src/components/splash/SplashScreen.tsx`:

```tsx
<SplashScreen
  minDisplayTime={2000}  // 2 seconds
  onComplete={() => setShowSplash(false)}
/>
```

### Animation Style

For CSS animations, edit `src/styles/splash.css`.

For Framer Motion, use `AnimatedSplashScreen.tsx` instead:

```tsx
import { AnimatedSplashScreen } from '@/components/splash/AnimatedSplashScreen';

<AnimatedSplashScreen
  minDisplayTime={1500}
  onComplete={handleComplete}
/>
```

## TWA Configuration

### Package ID

`twa/twa-manifest.json`:
```json
{
  "packageId": "com.yourcompany.yourapp"
}
```

**Important:** Update package path in build script if changed:
```bash
# twa/scripts/build-twa.sh
PACKAGE_PATH="com/yourcompany/yourapp"
```

### Theme Colors

```json
{
  "themeColor": "#9945FF",
  "backgroundColor": "#0D0D0D"
}
```

### Splash Configuration

```json
{
  "splashScreenFadeOutDuration": 300
}
```

## Component Customization

### Buttons

Edit styles in `mobile.css`:

```css
.btn-primary {
  background: linear-gradient(135deg, #your-color 0%, #your-dark 100%);
  border-radius: 16px;  /* More rounded */
}
```

### Cards

```css
.card {
  border-radius: 24px;  /* More rounded */
  border: none;  /* Remove border */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);  /* Add shadow */
}
```

### Touch Targets

Maintain 48px minimum for accessibility:

```css
:root {
  --touch-target-min: 48px;  /* Don't go below this */
}
```

## Adding Features

### Pull-to-Refresh

Already included. Use in any page:

```tsx
import { PullToRefresh } from '@/components/ui/PullToRefresh';

<PullToRefresh onRefresh={async () => {
  await fetchData();
}}>
  <YourContent />
</PullToRefresh>
```

### Animated Components

Available in `AnimatedComponents.tsx`:

```tsx
import {
  PageTransition,
  AnimatedCard,
  AnimatedButton,
  BottomSheet,
  AnimatedToast,
  Skeleton,
} from '@/components/ui/AnimatedComponents';
```

### Toast Notifications

```tsx
import { Toast, useToast } from '@/components/ui/Toast';

const { showToast, toastProps } = useToast();

showToast('Transaction successful!', 'success');

<Toast {...toastProps} />
```

## Best Practices

1. **Keep touch targets 48px+** for accessibility
2. **Test on real devices** before publishing
3. **Use CSS variables** for consistent theming
4. **Maintain safe area padding** for notches/gesture bars
5. **Test both light and dark modes**
6. **Optimize images** for mobile (WebP format recommended)
