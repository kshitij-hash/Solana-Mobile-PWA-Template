#!/bin/bash
# init-twa.sh - Initialize TWA project for fresh deployment
#
# This script helps users set up a TWA from scratch by:
# 1. Prompting for app configuration
# 2. Creating/updating twa-manifest.json
# 3. Generating a signing keystore
# 4. Running bubblewrap init
# 5. Extracting SHA256 fingerprint for assetlinks.json
#
# Prerequisites:
# - Node.js and npm installed
# - Java JDK 11+ installed
# - Bubblewrap CLI: npm install -g @bubblewrap/cli

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TWA_DIR="$(dirname "$SCRIPT_DIR")"
PROJECT_ROOT="$(dirname "$TWA_DIR")"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Solana Mobile PWA - TWA Initializer  ${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Check for bubblewrap
if ! command -v bubblewrap &> /dev/null; then
    echo -e "${YELLOW}Bubblewrap CLI not found. Installing...${NC}"
    npm install -g @bubblewrap/cli
fi

# Check for keytool (Java)
if ! command -v keytool &> /dev/null; then
    echo -e "${RED}Error: Java keytool not found. Please install JDK 11+${NC}"
    exit 1
fi

cd "$TWA_DIR"

echo -e "${CYAN}This wizard will help you set up your TWA (Trusted Web Activity).${NC}"
echo -e "${CYAN}Your PWA will be wrapped into an Android app.${NC}"
echo ""

# Prompt for configuration
echo -e "${BLUE}=== App Configuration ===${NC}"
echo ""

read -p "Enter your app name (e.g., My Solana App): " APP_NAME
APP_NAME=${APP_NAME:-"Solana Mobile PWA"}

read -p "Enter launcher name (short, max 12 chars): " LAUNCHER_NAME
LAUNCHER_NAME=${LAUNCHER_NAME:-"SolanaPWA"}

read -p "Enter package ID (e.g., com.mycompany.myapp): " PACKAGE_ID
PACKAGE_ID=${PACKAGE_ID:-"com.example.solanapwa"}

read -p "Enter your deployed PWA URL (e.g., myapp.vercel.app): " HOST
HOST=${HOST:-"your-app.vercel.app"}

# Remove https:// if provided
HOST=$(echo "$HOST" | sed 's|https://||' | sed 's|http://||' | sed 's|/$||')

read -p "Enter theme color (hex, e.g., #9945FF): " THEME_COLOR
THEME_COLOR=${THEME_COLOR:-"#9945FF"}

read -p "Enter background color (hex, e.g., #9945FF): " BG_COLOR
BG_COLOR=${BG_COLOR:-"#9945FF"}

echo ""
echo -e "${BLUE}=== Keystore Configuration ===${NC}"
echo ""

KEYSTORE_PATH="$TWA_DIR/android.keystore"
KEYSTORE_ALIAS="android"

if [ -f "$KEYSTORE_PATH" ]; then
    echo -e "${YELLOW}Existing keystore found at: $KEYSTORE_PATH${NC}"
    read -p "Use existing keystore? (y/n): " USE_EXISTING
    if [ "$USE_EXISTING" != "y" ] && [ "$USE_EXISTING" != "Y" ]; then
        rm -f "$KEYSTORE_PATH"
    fi
fi

if [ ! -f "$KEYSTORE_PATH" ]; then
    echo -e "${CYAN}Creating new signing keystore...${NC}"
    echo ""

    read -sp "Enter keystore password (min 6 chars): " KEYSTORE_PASS
    echo ""
    read -sp "Confirm keystore password: " KEYSTORE_PASS_CONFIRM
    echo ""

    if [ "$KEYSTORE_PASS" != "$KEYSTORE_PASS_CONFIRM" ]; then
        echo -e "${RED}Error: Passwords don't match${NC}"
        exit 1
    fi

    if [ ${#KEYSTORE_PASS} -lt 6 ]; then
        echo -e "${RED}Error: Password must be at least 6 characters${NC}"
        exit 1
    fi

    read -p "Enter your name or organization: " CERT_NAME
    CERT_NAME=${CERT_NAME:-"Developer"}

    # Generate keystore
    keytool -genkeypair \
        -alias "$KEYSTORE_ALIAS" \
        -keyalg RSA \
        -keysize 2048 \
        -validity 10000 \
        -keystore "$KEYSTORE_PATH" \
        -storepass "$KEYSTORE_PASS" \
        -keypass "$KEYSTORE_PASS" \
        -dname "CN=$CERT_NAME, OU=Development, O=$CERT_NAME, L=Unknown, ST=Unknown, C=US"

    echo -e "${GREEN}Keystore created successfully!${NC}"
    echo ""
    echo -e "${YELLOW}IMPORTANT: Save your keystore password securely!${NC}"
    echo -e "${YELLOW}You will need it for every build and update.${NC}"
    echo ""
fi

# Extract SHA256 fingerprint
echo -e "${CYAN}Extracting SHA256 fingerprint from keystore...${NC}"
echo ""

read -sp "Enter keystore password: " KEYSTORE_PASS
echo ""

FINGERPRINT=$(keytool -list -v -keystore "$KEYSTORE_PATH" -alias "$KEYSTORE_ALIAS" -storepass "$KEYSTORE_PASS" 2>/dev/null | grep "SHA256:" | awk '{print $2}')

if [ -z "$FINGERPRINT" ]; then
    echo -e "${RED}Error: Could not extract fingerprint. Check your password.${NC}"
    exit 1
fi

echo -e "${GREEN}SHA256 Fingerprint: ${FINGERPRINT}${NC}"
echo ""

# Create twa-manifest.json
echo -e "${CYAN}Creating twa-manifest.json...${NC}"

cat > "$TWA_DIR/twa-manifest.json" << EOF
{
  "packageId": "$PACKAGE_ID",
  "host": "$HOST",
  "name": "$APP_NAME",
  "launcherName": "$LAUNCHER_NAME",
  "display": "standalone",
  "themeColor": "$THEME_COLOR",
  "themeColorDark": "#000000",
  "navigationColor": "#000000",
  "navigationColorDark": "#000000",
  "navigationDividerColor": "#000000",
  "navigationDividerColorDark": "#000000",
  "backgroundColor": "$BG_COLOR",
  "enableNotifications": true,
  "startUrl": "/",
  "iconUrl": "https://$HOST/icons/icon-512x512.png",
  "maskableIconUrl": "https://$HOST/icons/icon-maskable-512x512.png",
  "splashScreenFadeOutDuration": 300,
  "signingKey": {
    "path": "./android.keystore",
    "alias": "$KEYSTORE_ALIAS"
  },
  "appVersionName": "1.0.0",
  "appVersionCode": 1,
  "shortcuts": [],
  "generatorApp": "bubblewrap-cli",
  "webManifestUrl": "https://$HOST/manifest.json",
  "fallbackType": "customtabs",
  "features": {},
  "alphaDependencies": {
    "enabled": false
  },
  "enableSiteSettingsShortcut": true,
  "isChromeOSOnly": false,
  "isMetaQuest": false,
  "fullScopeUrl": "https://$HOST/",
  "minSdkVersion": 21,
  "orientation": "portrait-primary",
  "fingerprints": [],
  "additionalTrustedOrigins": [],
  "retainedBundles": [],
  "protocolHandlers": [],
  "fileHandlers": [],
  "launchHandlerClientMode": "",
  "displayOverride": [],
  "appVersion": "1.0.0"
}
EOF

echo -e "${GREEN}twa-manifest.json created!${NC}"
echo ""

# Update assetlinks.json
ASSETLINKS_PATH="$PROJECT_ROOT/public/.well-known/assetlinks.json"
echo -e "${CYAN}Updating assetlinks.json...${NC}"

mkdir -p "$(dirname "$ASSETLINKS_PATH")"

cat > "$ASSETLINKS_PATH" << EOF
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "$PACKAGE_ID",
      "sha256_cert_fingerprints": [
        "$FINGERPRINT"
      ]
    }
  }
]
EOF

echo -e "${GREEN}assetlinks.json updated with your fingerprint!${NC}"
echo ""

# Generate Android project from our twa-manifest.json
echo -e "${CYAN}Generating Android project with Bubblewrap...${NC}"
echo ""

# Clean previous build artifacts if they exist
rm -rf app build .gradle gradle gradlew gradlew.bat build.gradle settings.gradle gradle.properties 2>/dev/null || true

# Use bubblewrap build which respects the existing twa-manifest.json
# This generates the Android project without overwriting our manifest
export BUBBLEWRAP_KEYSTORE_PASSWORD="$KEYSTORE_PASS"
export BUBBLEWRAP_KEY_PASSWORD="$KEYSTORE_PASS"

bubblewrap build --skipPwaValidation || {
    echo -e "${RED}Bubblewrap build failed.${NC}"
    echo -e "${YELLOW}Make sure your PWA is deployed and accessible at https://$HOST${NC}"
    exit 1
}

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  TWA Initialization & Build Complete! ${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Find the APK
SIGNED_APK=$(find "$TWA_DIR" -name "app-release-signed.apk" -o -name "*-signed.apk" 2>/dev/null | head -1)
if [ -n "$SIGNED_APK" ]; then
    echo -e "Signed APK: ${CYAN}$SIGNED_APK${NC}"
    echo ""
fi

echo -e "${YELLOW}IMPORTANT - Next Steps:${NC}"
echo ""
echo -e "1. ${CYAN}Deploy your PWA${NC} (if not already deployed) to https://$HOST"
echo ""
echo -e "2. ${CYAN}Verify assetlinks.json${NC} is accessible at:"
echo -e "   https://$HOST/.well-known/assetlinks.json"
echo -e "   (Deploy your app to update this file on the server)"
echo ""
echo -e "3. ${CYAN}Test the APK${NC} on your device:"
echo -e "   adb install app-release-signed.apk"
echo ""
echo -e "4. ${CYAN}For future builds${NC}, run:"
echo -e "   ./scripts/build-twa.sh"
echo ""
echo -e "${YELLOW}Your Digital Asset Links fingerprint:${NC}"
echo -e "   ${GREEN}$FINGERPRINT${NC}"
echo ""
echo -e "${YELLOW}Save these values securely:${NC}"
echo -e "  Package ID:      $PACKAGE_ID"
echo -e "  Host:            $HOST"
echo -e "  Keystore:        $KEYSTORE_PATH"
echo -e "  Keystore alias:  $KEYSTORE_ALIAS"
echo -e "  Keystore pass:   (you entered it above)"
echo ""
echo -e "${RED}WARNING: Keep your keystore and password safe!${NC}"
echo -e "${RED}You need the SAME keystore for all future app updates.${NC}"
echo ""
