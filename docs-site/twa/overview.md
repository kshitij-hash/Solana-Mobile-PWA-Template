# TWA Overview

Convert your PWA into a native Android app using Trusted Web Activity (TWA).

## What is TWA?

Trusted Web Activity (TWA) is an Android feature that allows you to wrap a PWA in a native Android app. The result:

- **Full-screen experience** - No browser UI (URL bar, navigation)
- **Play Store distribution** - Distribute via Google Play or Solana dApp Store
- **Native features** - Push notifications, app shortcuts, home screen presence
- **Same codebase** - Your PWA powers the Android app

## How It Works

```
┌─────────────────────────────────────┐
│           Android App (TWA)          │
│  ┌───────────────────────────────┐  │
│  │                               │  │
│  │     Chrome Custom Tab         │  │
│  │                               │  │
│  │   ┌───────────────────────┐   │  │
│  │   │                       │   │  │
│  │   │    Your PWA           │   │  │
│  │   │    (Full Screen)      │   │  │
│  │   │                       │   │  │
│  │   └───────────────────────┘   │  │
│  │                               │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

1. **User opens app** from home screen
2. **TWA launches** Chrome Custom Tab (full screen)
3. **Chrome loads** your PWA from your domain
4. **User sees** your web app without any browser UI

## Requirements

### For Building

- **Node.js** 18+
- **Java JDK** 17
- **Bubblewrap CLI** (`npm install -g @bubblewrap/cli`)

### For Users

- **Android 7.0+** (API 24+)
- **Chrome browser** installed (or TWA-compatible browser)

## Chrome Preference

By default, TWA uses any compatible browser. This template forces Chrome:

```java
// CustomLauncherActivity.java
@Override
protected String getProviderPackage() {
    for (String chromePackage : CHROME_PACKAGES) {
        if (isPackageInstalled(chromePackage)) {
            return chromePackage;
        }
    }
    return null; // Fall back to default
}
```

**Why Chrome?**
- Best MWA (Mobile Wallet Adapter) support
- Consistent behavior across devices
- Latest web features
- Better debugging

## Digital Asset Links

For frameless mode (no URL bar), you must prove domain ownership:

1. **Generate signing key** for your APK
2. **Get SHA256 fingerprint** from the keystore
3. **Host assetlinks.json** at `/.well-known/assetlinks.json`
4. **Google verifies** ownership automatically

Without this, users see a URL bar at the top.

## Template Features

The template includes:

| Feature | Description |
|---------|-------------|
| Chrome Preference | Custom activity forces Chrome |
| Build Script | `build-twa.sh` automates everything |
| TWA Manifest | Pre-configured `twa-manifest.json` |
| Asset Links | Ready-to-deploy `assetlinks.json` |
| Splash Screen | Native splash + PWA animated splash |

## Build Flow

```bash
# 1. Install Bubblewrap
npm install -g @bubblewrap/cli

# 2. Initialize TWA (first time only)
cd twa
bubblewrap init --manifest https://your-domain.com/manifest.json

# 3. Build APK
bubblewrap build

# 4. Test on device
adb install app-release-signed.apk
```

## Next Steps

1. [TWA Setup](/twa/setup) - Configure your TWA project
2. [Building](/twa/building) - Generate APK/AAB
3. [Chrome Preference](/twa/chrome-preference) - How it works
4. [Digital Asset Links](/twa/asset-links) - Enable frameless mode
5. [dApp Store](/twa/dapp-store) - Publish to Solana dApp Store
