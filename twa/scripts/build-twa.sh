#!/bin/bash
# build-twa.sh - Build TWA APK with Chrome browser preference
#
# This script:
# 1. Checks prerequisites and existing configuration
# 2. Generates/updates the TWA Android project using Bubblewrap
# 3. Copies the custom LauncherActivity that forces Chrome preference
# 4. Builds the signed APK
#
# Prerequisites:
# - Node.js and npm installed
# - Java JDK 11+ installed
# - Android SDK installed (or let Bubblewrap install it)
# - Bubblewrap CLI: npm install -g @bubblewrap/cli
# - Run init-twa.sh first for fresh setup

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Solana Mobile PWA - TWA Build Script  ${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TWA_DIR="$(dirname "$SCRIPT_DIR")"
PROJECT_ROOT="$(dirname "$TWA_DIR")"

# Navigate to TWA directory
cd "$TWA_DIR"

# Check for bubblewrap
if ! command -v bubblewrap &> /dev/null; then
    echo -e "${YELLOW}Bubblewrap not found. Installing...${NC}"
    npm install -g @bubblewrap/cli
fi

# Check for twa-manifest.json
if [ ! -f "twa-manifest.json" ]; then
    echo -e "${RED}Error: twa-manifest.json not found${NC}"
    echo -e "Run ${CYAN}./scripts/init-twa.sh${NC} first to set up your TWA."
    exit 1
fi

# Check for keystore
if [ ! -f "android.keystore" ]; then
    echo -e "${RED}Error: android.keystore not found${NC}"
    echo -e "Run ${CYAN}./scripts/init-twa.sh${NC} first to create a keystore."
    exit 1
fi

# Extract configuration from manifest
PACKAGE_ID=$(grep -o '"packageId"[[:space:]]*:[[:space:]]*"[^"]*"' twa-manifest.json | cut -d'"' -f4)
HOST=$(grep -o '"host"[[:space:]]*:[[:space:]]*"[^"]*"' twa-manifest.json | cut -d'"' -f4)

echo -e "Package ID: ${CYAN}$PACKAGE_ID${NC}"
echo -e "Host: ${CYAN}$HOST${NC}"
echo ""

# Convert package ID to path (com.example.app -> com/example/app)
PACKAGE_PATH=$(echo "$PACKAGE_ID" | tr '.' '/')

# Check assetlinks.json
ASSETLINKS_PATH="$PROJECT_ROOT/public/.well-known/assetlinks.json"
if [ -f "$ASSETLINKS_PATH" ]; then
    if grep -q "YOUR_SHA256_FINGERPRINT_HERE" "$ASSETLINKS_PATH"; then
        echo -e "${YELLOW}WARNING: assetlinks.json still has placeholder fingerprint!${NC}"
        echo -e "Run ${CYAN}./scripts/update-assetlinks.sh${NC} to update it."
        echo -e "Without proper assetlinks.json, your TWA will show a URL bar."
        echo ""
        read -p "Continue anyway? (y/n): " CONTINUE
        if [ "$CONTINUE" != "y" ] && [ "$CONTINUE" != "Y" ]; then
            exit 1
        fi
    fi
else
    echo -e "${YELLOW}WARNING: assetlinks.json not found!${NC}"
    echo -e "Run ${CYAN}./scripts/update-assetlinks.sh${NC} to create it."
    echo ""
fi

# Prompt for keystore password
read -sp "Enter keystore password: " KEYSTORE_PASS
echo ""
echo ""

# Export password for bubblewrap
export BUBBLEWRAP_KEYSTORE_PASSWORD="$KEYSTORE_PASS"
export BUBBLEWRAP_KEY_PASSWORD="$KEYSTORE_PASS"

echo -e "${GREEN}Step 1: Building with Bubblewrap...${NC}"
echo ""

# Run bubblewrap build
bubblewrap build --skipPwaValidation || {
    echo -e "${RED}Bubblewrap build failed.${NC}"
    echo -e "If this is your first build, try running:"
    echo -e "  ${CYAN}bubblewrap init --manifest https://$HOST/manifest.json${NC}"
    exit 1
}

# Check if Android project was generated
if [ ! -d "app" ]; then
    echo -e "${RED}Error: Android project not generated.${NC}"
    echo -e "Try running: ${CYAN}bubblewrap init --manifest https://$HOST/manifest.json${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}Step 2: Adding Chrome preference with CustomLauncherActivity...${NC}"

# Create package directory if it doesn't exist
mkdir -p "app/src/main/java/$PACKAGE_PATH"

# Check if CustomLauncherActivity.java exists in TWA root
if [ -f "$TWA_DIR/CustomLauncherActivity.java" ]; then
    # Update package name in CustomLauncherActivity - replace any package declaration
    sed "s/^package .*;/package $PACKAGE_ID;/" \
        "$TWA_DIR/CustomLauncherActivity.java" > "app/src/main/java/$PACKAGE_PATH/CustomLauncherActivity.java"
    echo -e "${GREEN}CustomLauncherActivity copied with package: $PACKAGE_ID${NC}"
else
    echo -e "${YELLOW}CustomLauncherActivity.java not found, using default launcher${NC}"
fi

echo ""
echo -e "${GREEN}Step 3: Updating AndroidManifest.xml...${NC}"

MANIFEST_FILE="app/src/main/AndroidManifest.xml"

if [ -f "$MANIFEST_FILE" ]; then
    # Check if CustomLauncherActivity exists
    if [ -f "app/src/main/java/$PACKAGE_PATH/CustomLauncherActivity.java" ]; then
        # Replace LauncherActivity with CustomLauncherActivity in manifest
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            sed -i '' 's/android:name="LauncherActivity"/android:name=".CustomLauncherActivity"/g' "$MANIFEST_FILE"
            sed -i '' 's/android:name="com\.google\.androidbrowserhelper\.trusted\.LauncherActivity"/android:name=".CustomLauncherActivity"/g' "$MANIFEST_FILE"
        else
            # Linux
            sed -i 's/android:name="LauncherActivity"/android:name=".CustomLauncherActivity"/g' "$MANIFEST_FILE"
            sed -i 's/android:name="com\.google\.androidbrowserhelper\.trusted\.LauncherActivity"/android:name=".CustomLauncherActivity"/g' "$MANIFEST_FILE"
        fi
        echo -e "${GREEN}AndroidManifest.xml updated to use CustomLauncherActivity${NC}"
    fi
else
    echo -e "${YELLOW}AndroidManifest.xml not found, skipping modification${NC}"
fi

echo ""
echo -e "${GREEN}Step 4: Building signed APK...${NC}"
echo ""

# Build with gradle
./gradlew assembleRelease

# Find the output APK
UNSIGNED_APK="app/build/outputs/apk/release/app-release-unsigned.apk"
SIGNED_APK="$TWA_DIR/app-release-signed.apk"

if [ -f "$UNSIGNED_APK" ]; then
    echo ""
    echo -e "${GREEN}Step 5: Signing and aligning APK...${NC}"

    # Align the APK
    ALIGNED_APK="$TWA_DIR/app-release-unsigned-aligned.apk"

    # Find zipalign
    ZIPALIGN=$(find "$ANDROID_HOME" -name "zipalign" 2>/dev/null | head -1)
    if [ -z "$ZIPALIGN" ]; then
        ZIPALIGN=$(which zipalign 2>/dev/null)
    fi

    if [ -n "$ZIPALIGN" ]; then
        "$ZIPALIGN" -v -p 4 "$UNSIGNED_APK" "$ALIGNED_APK"
    else
        echo -e "${YELLOW}zipalign not found, copying unaligned APK${NC}"
        cp "$UNSIGNED_APK" "$ALIGNED_APK"
    fi

    # Sign with apksigner
    APKSIGNER=$(find "$ANDROID_HOME" -name "apksigner" 2>/dev/null | head -1)
    if [ -z "$APKSIGNER" ]; then
        APKSIGNER=$(which apksigner 2>/dev/null)
    fi

    if [ -n "$APKSIGNER" ]; then
        "$APKSIGNER" sign --ks "$TWA_DIR/android.keystore" \
            --ks-key-alias "android" \
            --ks-pass "pass:$KEYSTORE_PASS" \
            --key-pass "pass:$KEYSTORE_PASS" \
            --out "$SIGNED_APK" \
            "$ALIGNED_APK"
        echo -e "${GREEN}APK signed successfully!${NC}"
    else
        # Fallback to jarsigner
        echo -e "${YELLOW}apksigner not found, using jarsigner...${NC}"
        cp "$ALIGNED_APK" "$SIGNED_APK"
        jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 \
            -keystore "$TWA_DIR/android.keystore" \
            -storepass "$KEYSTORE_PASS" \
            "$SIGNED_APK" android
    fi

    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  Build Complete!${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo -e "Signed APK: ${CYAN}$SIGNED_APK${NC}"
    echo ""
    echo -e "${YELLOW}Next steps:${NC}"
    echo ""
    echo -e "1. ${CYAN}Test the APK${NC} on your device:"
    echo -e "   adb install $SIGNED_APK"
    echo ""
    echo -e "2. ${CYAN}Verify Digital Asset Links${NC} (to remove URL bar):"
    echo -e "   - Ensure assetlinks.json is deployed"
    echo -e "   - Test: https://developers.google.com/digital-asset-links/tools/generator"
    echo ""
    echo -e "3. ${CYAN}Submit to Solana dApp Store${NC}:"
    echo -e "   - https://github.com/solana-mobile/dapp-publishing"
    echo ""
else
    echo -e "${RED}Error: APK not found at expected location${NC}"
    echo -e "Check gradle build output for errors."
    exit 1
fi
