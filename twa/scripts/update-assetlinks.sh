#!/bin/bash
# update-assetlinks.sh - Extract SHA256 fingerprint and update assetlinks.json
#
# This script:
# 1. Extracts SHA256 fingerprint from your keystore
# 2. Updates public/.well-known/assetlinks.json with the fingerprint
#
# This is crucial for Digital Asset Links verification - without this,
# your TWA will show a URL bar instead of running in fullscreen.

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TWA_DIR="$(dirname "$SCRIPT_DIR")"
PROJECT_ROOT="$(dirname "$TWA_DIR")"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Update Digital Asset Links           ${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Check for keystore
KEYSTORE_PATH="$TWA_DIR/android.keystore"
if [ ! -f "$KEYSTORE_PATH" ]; then
    echo -e "${RED}Error: Keystore not found at $KEYSTORE_PATH${NC}"
    echo -e "Run ${CYAN}./scripts/init-twa.sh${NC} first to create a keystore."
    exit 1
fi

# Check for twa-manifest.json to get package ID
MANIFEST_PATH="$TWA_DIR/twa-manifest.json"
if [ ! -f "$MANIFEST_PATH" ]; then
    echo -e "${RED}Error: twa-manifest.json not found${NC}"
    echo -e "Run ${CYAN}./scripts/init-twa.sh${NC} first."
    exit 1
fi

# Extract package ID from manifest
PACKAGE_ID=$(grep -o '"packageId"[[:space:]]*:[[:space:]]*"[^"]*"' "$MANIFEST_PATH" | cut -d'"' -f4)
if [ -z "$PACKAGE_ID" ]; then
    echo -e "${RED}Error: Could not extract packageId from twa-manifest.json${NC}"
    exit 1
fi

echo -e "Package ID: ${CYAN}$PACKAGE_ID${NC}"
echo ""

# Get keystore alias
KEYSTORE_ALIAS=$(grep -o '"alias"[[:space:]]*:[[:space:]]*"[^"]*"' "$MANIFEST_PATH" | cut -d'"' -f4)
KEYSTORE_ALIAS=${KEYSTORE_ALIAS:-"android"}

echo -e "Keystore alias: ${CYAN}$KEYSTORE_ALIAS${NC}"
echo ""

# Prompt for password
read -sp "Enter keystore password: " KEYSTORE_PASS
echo ""
echo ""

# Extract fingerprint
echo -e "${CYAN}Extracting SHA256 fingerprint...${NC}"
FINGERPRINT=$(keytool -list -v -keystore "$KEYSTORE_PATH" -alias "$KEYSTORE_ALIAS" -storepass "$KEYSTORE_PASS" 2>/dev/null | grep "SHA256:" | awk '{print $2}')

if [ -z "$FINGERPRINT" ]; then
    echo -e "${RED}Error: Could not extract fingerprint. Check your password and alias.${NC}"
    exit 1
fi

echo -e "${GREEN}SHA256 Fingerprint:${NC}"
echo -e "${YELLOW}$FINGERPRINT${NC}"
echo ""

# Update assetlinks.json
ASSETLINKS_PATH="$PROJECT_ROOT/public/.well-known/assetlinks.json"
echo -e "${CYAN}Updating $ASSETLINKS_PATH...${NC}"

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

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  assetlinks.json Updated!             ${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${YELLOW}IMPORTANT:${NC}"
echo -e "1. Deploy your app so the updated assetlinks.json is accessible at:"
echo -e "   ${CYAN}https://your-domain/.well-known/assetlinks.json${NC}"
echo ""
echo -e "2. Verify it's working:"
echo -e "   ${CYAN}curl https://your-domain/.well-known/assetlinks.json${NC}"
echo ""
echo -e "3. Google's verification tool:"
echo -e "   ${CYAN}https://developers.google.com/digital-asset-links/tools/generator${NC}"
echo ""
echo -e "Without proper assetlinks.json, your TWA will show a URL bar!"
echo ""
