# TWA (Trusted Web Activity) Setup Guide

This guide walks you through converting your PWA into an Android app using Bubblewrap and configuring Chrome as the preferred browser.

## Prerequisites

- Node.js 14.15.0 or higher
- Your PWA deployed with a valid `manifest.json` at `https://your-domain.com/manifest.json`
- A domain you control (for Digital Asset Links)

## Quick Start

```bash
# Install Bubblewrap CLI globally
npm i -g @bubblewrap/cli

# Initialize TWA project (from your twa/ directory)
bubblewrap init --manifest https://your-domain.com/manifest.json

# Build the APK
bubblewrap build

# Test on device/emulator
bubblewrap install app-release-signed.apk
```

---

## Step-by-Step Guide

### 1. Install Bubblewrap CLI

```bash
npm i -g @bubblewrap/cli
```

Verify installation:
```bash
bubblewrap --version
```

### 2. Initialize TWA Project

Create a new directory for your TWA files and run:

```bash
mkdir twa && cd twa
bubblewrap init --manifest https://your-domain.com/manifest.json
```

Bubblewrap will:
1. Download your web manifest
2. Prompt for configuration options
3. Generate `twa-manifest.json` and Android project files

#### Configuration Prompts

| Setting | Recommendation |
|---------|---------------|
| **Domain** | Your PWA's domain (e.g., `app.example.com`) |
| **Display Mode** | `standalone` for app-like experience |
| **Status Bar** | `default` or custom color matching your theme |
| **Navigation Bar** | `#000000` (black) recommended |
| **Splash Screen** | Use your brand color + centered icon |
| **Keystore** | Generate new keystore, store securely |

> **Important**: Keep your keystore file and password secure. You'll need them for all future updates.

### 3. Configure twa-manifest.json

After initialization, customize `twa-manifest.json`:

```json
{
  "packageId": "com.yourcompany.yourapp",
  "host": "your-domain.com",
  "name": "Your App Name",
  "launcherName": "Your App",
  "display": "standalone",
  "themeColor": "#9945FF",
  "navigationColor": "#000000",
  "navigationColorDark": "#000000",
  "navigationDividerColor": "#000000",
  "navigationDividerColorDark": "#000000",
  "backgroundColor": "#000000",
  "startUrl": "/",
  "iconUrl": "/icons/icon-512x512.png",
  "maskableIconUrl": "/icons/icon-maskable-512x512.png",
  "splashScreenFadeOutDuration": 300,
  "enableNotifications": true,
  "shortcuts": [],
  "webManifestUrl": "/manifest.json",
  "fallbackType": "customtabs",
  "enableSiteSettingsShortcut": false,
  "orientation": "portrait",
  "fingerprints": []
}
```

### 4. Add Language Support

Edit the generated `build.gradle` to specify supported languages:

```gradle
android {
    defaultConfig {
        // ... existing config
        resConfigs "en"  // Add languages your app supports
    }
}
```

> **Warning**: Skip this and your app will incorrectly claim to support all languages.

### 5. Build the APK

```bash
bubblewrap build
```

This generates:
- `app-release-signed.apk` - Production-ready APK
- `app-release-unsigned.apk` - Unsigned APK (for custom signing)

### 6. Set Up Digital Asset Links

Digital Asset Links (DAL) verify ownership between your website and Android app. **Required for frameless mode.**

#### 6.1 Get SHA256 Fingerprint

```bash
keytool -list -v -keystore android.keystore
```

Look for the `SHA256:` line under "Certificate fingerprints".

#### 6.2 Add Fingerprint to TWA

```bash
bubblewrap fingerprint add YOUR_SHA256_FINGERPRINT
```

#### 6.3 Generate assetlinks.json

```bash
bubblewrap fingerprint generateAssetLinks
```

#### 6.4 Host assetlinks.json

Copy the generated `assetlinks.json` to your web server at:
```
https://your-domain.com/.well-known/assetlinks.json
```

Example `assetlinks.json`:
```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.yourcompany.yourapp",
    "sha256_cert_fingerprints": [
      "AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99"
    ]
  }
}]
```

> **Tip**: You can include multiple fingerprints (debug + release) in the array.

---

## Chrome Browser Preference

By default, TWAs use whatever browser supports TWA on the device. To prefer Chrome with fallback to system default, use the custom `LauncherActivity` included in this template.

### How It Works

The `CustomLauncherActivity.java` in `twa/` directory:

1. Checks if Chrome (stable, beta, or dev) is installed
2. If found, uses Chrome as the TWA provider
3. If not found, falls back to system default browser

### Implementation

1. Copy `CustomLauncherActivity.java` to your generated Android project:
   ```
   app/src/main/java/com/yourcompany/yourapp/CustomLauncherActivity.java
   ```

2. Update `AndroidManifest.xml` to use the custom launcher:
   ```xml
   <activity
       android:name=".CustomLauncherActivity"
       android:exported="true">
       <intent-filter>
           <action android:name="android.intent.action.MAIN" />
           <category android:name="android.intent.category.LAUNCHER" />
       </intent-filter>
   </activity>
   ```

3. Remove or comment out the original `LauncherActivity` declaration.

### Important Note

After running `bubblewrap update`, the custom activity will be overwritten. Re-apply the changes or use the `build-twa.sh` script which automates this.

---

## Automated Build Script

Use the included `build-twa.sh` for streamlined builds:

```bash
chmod +x twa/build-twa.sh
./twa/build-twa.sh
```

The script:
1. Runs `bubblewrap update` to regenerate the project
2. Applies the custom LauncherActivity
3. Builds the signed APK
4. Outputs the APK location

---

## Testing

### Install on Device/Emulator

```bash
# Using Bubblewrap
bubblewrap install app-release-signed.apk

# Using ADB directly
adb install app-release-signed.apk
```

### Verify Frameless Mode

If you see the Chrome URL bar at the top:
1. Digital Asset Links are not configured correctly
2. Check `assetlinks.json` is accessible at `/.well-known/assetlinks.json`
3. Verify SHA256 fingerprint matches your signing key
4. Clear Chrome's cache: Settings > Apps > Chrome > Storage > Clear Data

### Debug Checklist

| Issue | Solution |
|-------|----------|
| URL bar visible | Check Digital Asset Links setup |
| App crashes on launch | Verify manifest.json is accessible |
| White screen | Check start_url in manifest |
| Icons missing | Verify icon paths in manifest |
| Splash doesn't show | Check splashScreenFadeOutDuration |

---

## Updating Your TWA

When you need to update the TWA configuration:

```bash
# Update TWA manifest changes
bubblewrap update --manifest=./twa-manifest.json

# Rebuild
bubblewrap build
```

This will:
- Regenerate the Android project
- Bump the version number
- Preserve your `twa-manifest.json`

> **Note**: Manual changes to the Android project are lost on update. Use the build script to reapply customizations.

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Build TWA

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Setup Java
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '17'

      - name: Install Bubblewrap
        run: npm i -g @bubblewrap/cli

      - name: Decode Keystore
        run: echo "${{ secrets.KEYSTORE_BASE64 }}" | base64 -d > android.keystore

      - name: Build TWA
        run: |
          cd twa
          bubblewrap build --skipPwaValidation
        env:
          BUBBLEWRAP_KEYSTORE_PASSWORD: ${{ secrets.KEYSTORE_PASSWORD }}
          BUBBLEWRAP_KEY_PASSWORD: ${{ secrets.KEY_PASSWORD }}

      - name: Upload APK
        uses: actions/upload-artifact@v4
        with:
          name: app-release
          path: twa/app-release-signed.apk
```

### Required Secrets

| Secret | Description |
|--------|-------------|
| `KEYSTORE_BASE64` | Base64-encoded keystore file |
| `KEYSTORE_PASSWORD` | Keystore password |
| `KEY_PASSWORD` | Key alias password |

Generate base64 keystore:
```bash
base64 -i android.keystore -o keystore.txt
```

---

## Troubleshooting

### "Browser not found" Error

The device doesn't have a TWA-compatible browser. Solution:
- Install Chrome
- Or accept fallback to Custom Tabs (shows URL bar)

### Build Fails with SDK Error

```bash
# Let Bubblewrap install required SDK components
bubblewrap doctor

# Or manually install Android SDK
sdkmanager "platforms;android-34" "build-tools;34.0.0"
```

### Keystore Issues

```bash
# Verify keystore
keytool -list -v -keystore android.keystore

# Create new keystore (loses ability to update existing app!)
keytool -genkey -v -keystore android.keystore -alias your-alias -keyalg RSA -keysize 2048 -validity 10000
```

---

## Resources

- [Bubblewrap Documentation](https://github.com/nicetransition/niceweb-browser-helper)
- [TWA Overview (Chrome)](https://developer.chrome.com/docs/android/trusted-web-activity)
- [Digital Asset Links](https://developers.google.com/digital-asset-links)
- [Solana Mobile PWA Guide](https://docs.solanamobile.com/dapp-publishing/publishing-a-pwa)

---

## Next Steps

Once you have a working APK:

1. Test thoroughly on real devices
2. Follow [PUBLISHING.md](./PUBLISHING.md) to submit to the Solana dApp Store
