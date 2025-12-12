# TWA Setup

Configure your TWA project with Bubblewrap.

## Prerequisites

- **Node.js** 18+
- **Java JDK** 17 (Bubblewrap can install this)
- **Your PWA deployed** with HTTPS and valid manifest

## Install Bubblewrap

```bash
npm install -g @bubblewrap/cli
```

Verify installation:

```bash
bubblewrap --version
```

## Initialize TWA Project

Navigate to your TWA directory and initialize:

```bash
cd twa
bubblewrap init --manifest https://your-domain.com/manifest.json
```

### Prompts

Bubblewrap will ask several questions:

| Prompt | Recommended Value |
|--------|-------------------|
| Install JDK? | Yes (if not installed) |
| Install Android SDK? | Yes (if not installed) |
| Domain | Your deployed domain |
| URL path | `/` |
| Application name | Your app name |
| Short name | Short version (12 chars max) |
| Application ID | `com.yourcompany.yourapp` |
| Display mode | `standalone` |
| Status bar color | Your theme color |
| Splash screen color | Your background color |

### Example Session

```
? Domain: solana-pwa-template.vercel.app
? URL path: /
? Application name: Solana Mobile PWA
? Short name: SolanaPWA
? Application ID: com.solanapwa.template
? Display mode: standalone
? Status bar color: #9945FF
? Splash screen color: #9945FF
```

## Configure twa-manifest.json

After initialization, customize `twa/twa-manifest.json`:

```json
{
  "packageId": "com.solanapwa.template",
  "host": "solana-pwa-template.vercel.app",
  "name": "Solana Mobile PWA",
  "launcherName": "Solana PWA",
  "display": "standalone",
  "themeColor": "#9945FF",
  "navigationColor": "#000000",
  "navigationColorDark": "#000000",
  "backgroundColor": "#0a0a0a",
  "startUrl": "/",
  "iconUrl": "/icons/icon-512x512.png",
  "maskableIconUrl": "/icons/icon-maskable-512x512.png",
  "splashScreenFadeOutDuration": 300,
  "enableNotifications": true,
  "shortcuts": [
    {
      "name": "Wallet",
      "shortName": "Wallet",
      "url": "/wallet",
      "icons": [
        {
          "src": "/icons/icon-192x192.png",
          "sizes": "192x192"
        }
      ]
    }
  ],
  "webManifestUrl": "/manifest.json",
  "fallbackType": "customtabs",
  "orientation": "portrait",
  "signing": {
    "keystore": "./android.keystore",
    "alias": "android"
  },
  "appVersionCode": 1,
  "appVersionName": "1.0.0",
  "minSdkVersion": 24,
  "targetSdkVersion": 34
}
```

### Key Fields

| Field | Description |
|-------|-------------|
| `packageId` | Unique app identifier |
| `host` | Your deployed domain (no https://) |
| `themeColor` | Status bar color |
| `navigationColor` | Navigation bar color |
| `backgroundColor` | Splash screen background |
| `splashScreenFadeOutDuration` | Splash fade duration (ms) |
| `fallbackType` | `customtabs` shows URL bar if verification fails |
| `minSdkVersion` | Minimum Android version (24 = Android 7.0) |

## Keystore Setup

### Create New Keystore

During `bubblewrap init`, you'll be prompted to create a keystore:

```
? Key store location: ./android.keystore
? Key name: android
? Password for the Key Store: ********
```

### Or Create Manually

```bash
keytool -genkeypair \
  -alias android \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -keystore android.keystore
```

::: warning
**Keep your keystore safe!** You need it for all future app updates. Lost keystore = new app listing.
:::

### Get SHA256 Fingerprint

```bash
keytool -list -v -keystore android.keystore
```

Look for the SHA256 fingerprint - you'll need this for Digital Asset Links.

## Directory Structure

After setup, your `twa/` directory contains:

```
twa/
├── twa-manifest.json        # Your configuration
├── android.keystore         # Signing key (KEEP SAFE!)
├── CustomLauncherActivity.java  # Chrome preference
├── scripts/
│   └── build-twa.sh         # Build automation
└── (generated after build)
    ├── app/                 # Android project
    ├── app-release-signed.apk
    └── app-release-bundle.aab
```

## Next Steps

1. [Build your APK](/twa/building)
2. [Configure Digital Asset Links](/twa/asset-links)
