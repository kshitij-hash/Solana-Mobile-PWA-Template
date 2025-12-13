# TWA Overview

Convert your PWA into a native Android app using Trusted Web Activity (TWA).

## What is TWA?

Trusted Web Activity (TWA) is an Android feature that allows you to wrap a PWA in a native Android app. The result:

- **Full-screen experience** - No browser UI (URL bar, navigation)
- **dApp Store distribution** - Distribute via Solana dApp Store
- **Native features** - Push notifications, app shortcuts, home screen presence
- **Same codebase** - Your PWA powers the Android app

## How It Works

```
┌─────────────────────────────────────┐
│           Android App (TWA)         │
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

- **Node.js** 20+
- **Java JDK** 17+
- **Bubblewrap CLI** (installed automatically by scripts)

### For Users

- **Android 7.0+** (API 24+)
- **Chrome browser** installed (recommended for MWA)

## Chrome Preference

The `android-browser-helper` library automatically prefers Chrome when it's installed. This is important for:

- **MWA support** - Best Mobile Wallet Adapter compatibility
- **Consistent behavior** - Predictable TWA experience
- **Latest features** - Access to newest web APIs

No custom configuration needed - Chrome preference is built-in.

## Digital Asset Links

For frameless mode (no URL bar), you must prove domain ownership:

1. **Generate signing key** for your APK
2. **Get SHA256 fingerprint** from the keystore
3. **Host assetlinks.json** at `/.well-known/assetlinks.json`
4. **Android verifies** ownership automatically

Without this, users see a URL bar at the top.

## Template Features

| Feature | Description |
|---------|-------------|
| Init Script | `init-twa.sh` handles complete setup |
| Build Script | `build-twa.sh` automates rebuilds |
| TWA Manifest Template | Pre-configured `twa-manifest.template.json` |
| Asset Links | Ready-to-deploy `assetlinks.json` |
| Chrome Preference | Automatic via android-browser-helper |

## Quick Start

```bash
# Navigate to TWA directory
cd twa

# Run the interactive setup (first time)
./scripts/init-twa.sh

# This will:
# - Prompt for app name, package ID, host URL
# - Generate signing keystore
# - Update assetlinks.json with fingerprint
# - Build signed APK
```

## Next Steps

1. [TWA Setup](/twa/setup) - Detailed configuration guide
2. [Building](/twa/building) - Build options and CI/CD
3. [Digital Asset Links](/twa/asset-links) - Enable frameless mode
4. [Chrome Preference](/twa/chrome-preference) - How it works
5. [dApp Store](/twa/dapp-store) - Publish to Solana dApp Store
