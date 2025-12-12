# Building TWA

Generate your Android APK and App Bundle.

## Quick Build

After [setup](/twa/setup), build with:

```bash
cd twa
bubblewrap build
```

This generates:
- `app-release-signed.apk` - For direct installation
- `app-release-bundle.aab` - For Play Store/dApp Store

## Build Script

The template includes an automated build script:

```bash
./scripts/build-twa.sh
```

This script:
1. Runs `bubblewrap build`
2. Copies `CustomLauncherActivity.java` for Chrome preference
3. Updates `AndroidManifest.xml`
4. Builds the final APK

## Password Prompts

During build, you'll be prompted for passwords:

```
Please, enter passwords for the keystore and alias android.

? Password for the Key Store: ********
? Password for the Key: ********
```

Enter the passwords you set during keystore creation.

## Build Output

Successful build shows:

```
Building the Android App...
  - Generated Android APK at ./app-release-signed.apk
  - Generated Android App Bundle at ./app-release-bundle.aab
```

## Testing the APK

### On Connected Device

```bash
adb install app-release-signed.apk
```

### On Emulator

```bash
# List available emulators
emulator -list-avds

# Start emulator
emulator -avd Pixel_6_API_34

# Install APK
adb install app-release-signed.apk
```

### Transfer to Phone

1. Connect phone via USB
2. Enable "File Transfer" mode
3. Copy `app-release-signed.apk` to phone
4. Open file manager → Install

## Version Updates

For app updates, increment version in `twa-manifest.json`:

```json
{
  "appVersionCode": 2,    // Must increase for updates
  "appVersionName": "1.1.0"
}
```

Then rebuild:

```bash
bubblewrap build
```

## Build Options

### Skip PWA Validation

If your manifest isn't perfect:

```bash
bubblewrap build --skipPwaValidation
```

### Use Existing Android Project

```bash
bubblewrap update --manifest=./twa-manifest.json
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
        run: |
          echo "${{ secrets.KEYSTORE_BASE64 }}" | base64 -d > twa/android.keystore

      - name: Build TWA
        working-directory: twa
        run: bubblewrap build --skipPwaValidation
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

| Secret | How to get |
|--------|-----------|
| `KEYSTORE_BASE64` | `base64 -i android.keystore` |
| `KEYSTORE_PASSWORD` | Your keystore password |
| `KEY_PASSWORD` | Your key alias password |

## Troubleshooting

### "JDK not found"

```bash
# Set JAVA_HOME
export JAVA_HOME=/path/to/jdk17

# Or let Bubblewrap install it
bubblewrap doctor
```

### "Android SDK not found"

```bash
# Let Bubblewrap install SDK
bubblewrap doctor
```

### Build Fails

1. Check `twa-manifest.json` is valid JSON
2. Verify manifest.json is accessible on your domain
3. Ensure icons exist at specified paths
4. Try `bubblewrap build --skipPwaValidation`

### APK Too Large

The APK includes Android resources but loads your PWA from the web. Size is typically 1-2MB regardless of PWA size.

## Next Steps

1. [Configure Digital Asset Links](/twa/asset-links) for frameless mode
2. [Publish to dApp Store](/twa/dapp-store)
