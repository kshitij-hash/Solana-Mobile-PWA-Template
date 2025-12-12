# Setup Guide

Complete guide to setting up and running the Solana Mobile PWA Template.

## Prerequisites

- **Node.js** 18.0.0 or higher
- **npm**, **yarn**, or **pnpm**
- **Git** (optional, for cloning)

For TWA build:
- **Java JDK** 11 or higher
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
git clone https://github.com/[username]/solana-mobile-pwa-template.git my-dapp
cd my-dapp
npm install
npm run dev
```

## Project Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
npm run start
```

## Configuration

### Environment Setup

Create a `.env.local` file for environment-specific settings:

```env
# Solana Network (mainnet-beta, devnet, testnet)
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta

# RPC Endpoint (optional - uses default if not set)
NEXT_PUBLIC_RPC_ENDPOINT=https://api.mainnet-beta.solana.com
```

### PWA Configuration

Edit `public/manifest.json`:

```json
{
  "name": "Your App Name",
  "short_name": "YourApp",
  "description": "Your app description",
  "theme_color": "#9945FF",
  "background_color": "#0D0D0D"
}
```

### Network Configuration

Edit `src/components/wallet/WalletProvider.tsx`:

```tsx
// Change network here
const network = WalletAdapterNetwork.Mainnet; // or Devnet, Testnet
```

## TWA Setup (Android App)

### 1. Install Bubblewrap

```bash
npm install -g @bubblewrap/cli
```

### 2. Configure TWA

Edit `twa/twa-manifest.json`:

```json
{
  "packageId": "com.yourcompany.yourapp",
  "host": "your-domain.com",
  "name": "Your App Name",
  "launcherName": "Your App",
  "startUrl": "/",
  "iconUrl": "https://your-domain.com/icons/icon-512x512.png",
  "themeColor": "#9945FF",
  "backgroundColor": "#0D0D0D"
}
```

### 3. Set Up Digital Asset Links

1. Generate a signing key:
```bash
keytool -genkeypair -alias release -keyalg RSA -keysize 2048 \
  -validity 10000 -keystore ./twa/keys/release.keystore
```

2. Get the SHA256 fingerprint:
```bash
keytool -list -v -keystore ./twa/keys/release.keystore -alias release
```

3. Update `public/.well-known/assetlinks.json`:
```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.yourcompany.yourapp",
    "sha256_cert_fingerprints": ["YOUR_SHA256_FINGERPRINT"]
  }
}]
```

4. Deploy your PWA so the file is accessible at:
   `https://your-domain.com/.well-known/assetlinks.json`

### 4. Build the TWA

```bash
cd twa
./scripts/build-twa.sh
```

### 5. Sign the APK

```bash
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 \
  -keystore ./keys/release.keystore \
  app/build/outputs/apk/release/app-release-unsigned.apk release
```

## Testing

### Local Development

1. Start the dev server: `npm run dev`
2. Open Chrome DevTools (F12)
3. Toggle device toolbar for mobile view
4. Test PWA features in Application tab

### Mobile Testing

1. Deploy to a staging URL with HTTPS
2. Open on mobile browser
3. Install as PWA via "Add to Home Screen"
4. Test wallet connection with MWA

### TWA Testing

```bash
# Install on connected device
adb install app/build/outputs/apk/release/app-release-signed.apk
```

## Common Issues

### "Bubblewrap not found"

Install globally:
```bash
npm install -g @bubblewrap/cli
```

### "Android SDK not found"

Let Bubblewrap install it, or set `ANDROID_HOME`:
```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### "Chrome not default browser in TWA"

Ensure `CustomLauncherActivity.java` is copied and AndroidManifest.xml is updated. The build script handles this automatically.

### "URL bar showing in TWA"

Digital Asset Links not configured correctly. Verify:
1. assetlinks.json is accessible via HTTPS
2. SHA256 fingerprint matches your signing key
3. Package name matches exactly

## Next Steps

- [Customization Guide](./CUSTOMIZATION.md) - Theming and branding
- [TWA Guide](./TWA-GUIDE.md) - Detailed TWA information
- [Publishing Guide](./PUBLISHING.md) - dApp Store submission
