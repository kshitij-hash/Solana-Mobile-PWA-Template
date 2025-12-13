# Building TWA

Generate your Android APK after initial setup.

## Rebuild APK

After [initial setup](/twa/setup), use the build script for subsequent builds:

```bash
cd twa
./scripts/build-twa.sh
```

This generates:
- `app-release-signed.apk` - For direct installation and dApp Store

## What the Build Script Does

1. Validates `twa-manifest.json` exists
2. Checks keystore is present
3. Runs Bubblewrap build
4. Copies `CustomLauncherActivity.java` to Android project
5. Updates package name in activity file
6. Builds signed APK

## Password Handling

Set environment variables to avoid password prompts:

```bash
export BUBBLEWRAP_KEYSTORE_PASSWORD="your-password"
export BUBBLEWRAP_KEY_PASSWORD="your-password"
./scripts/build-twa.sh
```

Or enter passwords when prompted during build.

## Testing the APK

### Install via ADB

```bash
adb install app-release-signed.apk
```

### Install via File Transfer

1. Connect phone via USB
2. Enable "File Transfer" mode
3. Copy `app-release-signed.apk` to phone
4. Open file manager and install

### Test Checklist

- [ ] App opens without URL bar (frameless mode)
- [ ] PWA loads correctly
- [ ] MWA wallet connection works
- [ ] Navigation functions properly
- [ ] Splash screen displays and fades

## Version Updates

For app updates, edit `twa-manifest.json`:

```json
{
  "appVersionCode": 2,
  "appVersionName": "1.1.0"
}
```

Rules:
- `appVersionCode` must always increase (1, 2, 3...)
- `appVersionCode` cannot be reused
- Then run `./scripts/build-twa.sh`

## Build Options

### Skip PWA Validation

If your manifest has minor issues:

```bash
# The build script uses this by default
bubblewrap build --skipPwaValidation
```

### Clean Build

If you encounter issues:

```bash
rm -rf app build .gradle
./scripts/build-twa.sh
```

## CI/CD Build

For automated builds (GitHub Actions):

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
        run: npm install -g @bubblewrap/cli

      - name: Decode Keystore
        run: echo "${{ secrets.KEYSTORE_BASE64 }}" | base64 -d > twa/android.keystore

      - name: Build TWA
        working-directory: twa
        run: ./scripts/build-twa.sh
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

| Secret | How to Generate |
|--------|-----------------|
| `KEYSTORE_BASE64` | `base64 -i android.keystore` |
| `KEYSTORE_PASSWORD` | Your keystore password |
| `KEY_PASSWORD` | Your key alias password |

## Build Output

Successful build shows:

```
Building the Android App...
  - Generated Android APK at ./app-release-signed.apk
```

## Next Steps

1. [Verify frameless mode](/twa/asset-links#step-4-verify-setup)
2. [Publish to dApp Store](/twa/dapp-store)
