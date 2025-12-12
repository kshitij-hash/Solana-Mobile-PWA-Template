#!/bin/bash
# build-twa.sh - Build TWA with Chrome browser preference
#
# This script:
# 1. Generates the TWA Android project using Bubblewrap
# 2. Copies the custom LauncherActivity that forces Chrome preference
# 3. Updates AndroidManifest.xml to use the custom activity
# 4. Builds the APK
#
# Prerequisites:
# - Node.js and npm installed
# - Java JDK 11+ installed
# - Android SDK installed (or let Bubblewrap install it)
# - Bubblewrap CLI: npm install -g @bubblewrap/cli

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Solana Mobile PWA - TWA Build Script  ${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TWA_DIR="$(dirname "$SCRIPT_DIR")"
PROJECT_ROOT="$(dirname "$TWA_DIR")"
PACKAGE_PATH="com/example/solanapwa"

# Check for bubblewrap
if ! command -v bubblewrap &> /dev/null; then
    echo -e "${YELLOW}Bubblewrap not found. Installing...${NC}"
    npm install -g @bubblewrap/cli
fi

# Navigate to TWA directory
cd "$TWA_DIR"

echo -e "${GREEN}Step 1: Generating TWA project with Bubblewrap...${NC}"
bubblewrap build --skipPwaValidation || {
    echo -e "${YELLOW}Note: If this is your first time, run 'bubblewrap init' first${NC}"
    exit 1
}

# Check if Android project was generated
if [ ! -d "app" ]; then
    echo -e "${RED}Error: Android project not generated. Run 'bubblewrap init' first.${NC}"
    exit 1
fi

echo -e "${GREEN}Step 2: Copying custom LauncherActivity for Chrome preference...${NC}"

# Create package directory if it doesn't exist
mkdir -p "app/src/main/java/$PACKAGE_PATH"

# Copy custom launcher activity
cp "$TWA_DIR/CustomLauncherActivity.java" "app/src/main/java/$PACKAGE_PATH/"

echo -e "${GREEN}Step 3: Updating AndroidManifest.xml...${NC}"

# Update AndroidManifest.xml to use CustomLauncherActivity
MANIFEST_FILE="app/src/main/AndroidManifest.xml"

if [ -f "$MANIFEST_FILE" ]; then
    # Replace LauncherActivity with CustomLauncherActivity
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' 's/com\.google\.androidbrowserhelper\.trusted\.LauncherActivity/.CustomLauncherActivity/g' "$MANIFEST_FILE"
    else
        # Linux
        sed -i 's/com\.google\.androidbrowserhelper\.trusted\.LauncherActivity/.CustomLauncherActivity/g' "$MANIFEST_FILE"
    fi
    echo -e "${GREEN}AndroidManifest.xml updated successfully${NC}"
else
    echo -e "${RED}Error: AndroidManifest.xml not found${NC}"
    exit 1
fi

echo -e "${GREEN}Step 4: Building APK...${NC}"

# Build the APK
./gradlew assembleRelease

# Check if APK was built
APK_PATH="app/build/outputs/apk/release/app-release-unsigned.apk"
if [ -f "$APK_PATH" ]; then
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  Build Complete!${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo -e "APK location: ${YELLOW}$APK_PATH${NC}"
    echo ""
    echo -e "${YELLOW}Next steps:${NC}"
    echo "1. Sign the APK with your release keystore"
    echo "2. Upload to Solana dApp Store"
    echo ""
    echo -e "To sign the APK:"
    echo -e "  ${YELLOW}jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 \\"
    echo -e "    -keystore ./keys/release.keystore $APK_PATH release${NC}"
    echo ""
else
    echo -e "${RED}Error: APK not found at expected location${NC}"
    exit 1
fi
