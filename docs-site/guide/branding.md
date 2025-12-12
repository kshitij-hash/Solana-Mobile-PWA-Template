# Branding

Customize the template with your brand identity.

## App Name

Update in multiple places:

### 1. PWA Manifest

`public/manifest.json`:

```json
{
  "name": "Your App Name",
  "short_name": "YourApp",
  "description": "Your app description"
}
```

### 2. TWA Manifest

`twa/twa-manifest.json`:

```json
{
  "name": "Your App Name",
  "launcherName": "YourApp"
}
```

### 3. HTML Metadata

`src/app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  title: 'Your App Name',
  description: 'Your app description',
  manifest: '/manifest.json',
  themeColor: '#9945FF',
};
```

### 4. Splash Screen

`src/components/splash/SplashScreen.tsx`:

```tsx
<h1 className="splash-title">Your App Name</h1>
```

### 5. Wallet Identity

`src/components/wallet/WalletProvider.tsx`:

```tsx
new SolanaMobileWalletAdapter({
  appIdentity: {
    name: 'Your App Name',
    uri: window.location.origin,
    icon: '/icons/icon-192x192.png',
  },
})
```

## App Icons

Replace icons in `public/icons/`:

| File | Size | Purpose |
|------|------|---------|
| `icon-72x72.png` | 72×72 | Android small |
| `icon-96x96.png` | 96×96 | Android medium |
| `icon-128x128.png` | 128×128 | Chrome Web Store |
| `icon-144x144.png` | 144×144 | Android medium-high |
| `icon-152x152.png` | 152×152 | iOS |
| `icon-192x192.png` | 192×192 | Android, PWA |
| `icon-384x384.png` | 384×384 | Android large |
| `icon-512x512.png` | 512×512 | PWA install splash |
| `icon-maskable-512x512.png` | 512×512 | Android adaptive |

### Creating Icons

**From a single 512x512 image:**

```bash
# Using ImageMagick
convert icon-512.png -resize 72x72 icon-72x72.png
convert icon-512.png -resize 96x96 icon-96x96.png
convert icon-512.png -resize 128x128 icon-128x128.png
convert icon-512.png -resize 144x144 icon-144x144.png
convert icon-512.png -resize 152x152 icon-152x152.png
convert icon-512.png -resize 192x192 icon-192x192.png
convert icon-512.png -resize 384x384 icon-384x384.png
```

### Maskable Icons

Maskable icons are used on Android for adaptive icons. They should:

- Have important content in the center 80%
- Have background extending to edges
- Look good when cropped to different shapes

Use [maskable.app](https://maskable.app/editor) to preview and create.

## Splash Screen Logo

### Using SVG

`src/components/splash/SplashScreen.tsx`:

```tsx
function YourLogo() {
  return (
    <svg viewBox="0 0 100 100" className="splash-logo">
      {/* Your logo paths */}
      <circle cx="50" cy="50" r="40" fill="currentColor" />
    </svg>
  );
}

export function SplashScreen() {
  return (
    <div className="splash-screen">
      <YourLogo />
      <h1>Your App Name</h1>
    </div>
  );
}
```

### Using Image

```tsx
import Image from 'next/image';

function SplashScreen() {
  return (
    <div className="splash-screen">
      <Image
        src="/icons/icon-512x512.png"
        alt="Logo"
        width={80}
        height={80}
      />
      <h1>Your App Name</h1>
    </div>
  );
}
```

## Favicon

Replace `public/favicon.ico` with your icon.

For modern browsers, also add to `layout.tsx`:

```tsx
export const metadata: Metadata = {
  icons: {
    icon: '/favicon.ico',
    apple: '/icons/icon-152x152.png',
  },
};
```

## Open Graph / Social

Add social sharing metadata in `layout.tsx`:

```tsx
export const metadata: Metadata = {
  openGraph: {
    title: 'Your App Name',
    description: 'Your app description',
    url: 'https://your-domain.com',
    siteName: 'Your App Name',
    images: [
      {
        url: '/og-image.png', // 1200x630 recommended
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your App Name',
    description: 'Your app description',
    images: ['/og-image.png'],
  },
};
```

## Theme Colors

Update brand colors throughout:

### CSS Variables

```css
:root {
  --color-primary: #your-brand-color;
  --color-primary-dark: #your-darker-shade;
  --color-secondary: #your-accent-color;
}
```

### Manifest

```json
{
  "theme_color": "#your-brand-color",
  "background_color": "#your-background-color"
}
```

### TWA Manifest

```json
{
  "themeColor": "#your-brand-color",
  "backgroundColor": "#your-background-color",
  "navigationColor": "#000000"
}
```

## Package ID (for TWA)

Choose a unique package ID:

`twa/twa-manifest.json`:

```json
{
  "packageId": "com.yourcompany.yourapp"
}
```

**Rules:**
- Must be unique (check Play Store)
- Use reverse domain notation
- Only lowercase letters, numbers, dots
- At least two segments (com.app)

## Checklist

- [ ] Update app name in all locations
- [ ] Replace all icon sizes
- [ ] Create maskable icon
- [ ] Update splash screen logo
- [ ] Replace favicon
- [ ] Set theme colors
- [ ] Add Open Graph image
- [ ] Configure package ID
- [ ] Update manifest descriptions
