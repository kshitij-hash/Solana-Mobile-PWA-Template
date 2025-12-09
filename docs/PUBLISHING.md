# Publishing to the Solana dApp Store

This guide walks you through publishing your PWA (wrapped as a TWA) to the Solana dApp Store.

## Prerequisites

Before publishing, ensure you have:

- [ ] A signed release APK (see [TWA-GUIDE.md](./TWA-GUIDE.md))
- [ ] Digital Asset Links configured and deployed
- [ ] App icon (512x512 PNG)
- [ ] Screenshots (1080x1920 or 1920x1080)
- [ ] App description and metadata
- [ ] A Solana wallet with ~0.2 SOL for fees
- [ ] Reviewed the [Publisher Policy](https://docs.solanamobile.com/dapp-publishing/publisher-policy)

---

## Publishing Overview

The Solana dApp Store uses an on-chain NFT system for app submissions:

1. **Publisher NFT** - Represents your developer identity
2. **App NFT** - Represents your application
3. **Release NFT** - Represents each version release

All submissions go through the [Solana dApp Publisher Portal](https://publish.solanamobile.com).

---

## Step 1: Prepare Your APK

### Build Your Release APK

```bash
cd twa
bubblewrap build
```

This generates `app-release-signed.apk`.

### Verify the APK

```bash
# Check signing
apksigner verify --print-certs app-release-signed.apk

# Check package info
aapt dump badging app-release-signed.apk | grep -E "package:|application-label:"
```

### Test Thoroughly

Before submitting, test on real devices:
- Saga
- Seeker
- Other Android devices with Chrome

Verify:
- App launches without URL bar (Digital Asset Links working)
- Wallet connection works
- Transactions complete successfully
- UI displays correctly at all screen sizes

---

## Step 2: Prepare App Assets

### Required Assets

| Asset | Specifications |
|-------|---------------|
| **App Icon** | 512x512 PNG, no transparency |
| **Feature Graphic** | 1024x500 PNG (optional but recommended) |
| **Screenshots** | 1080x1920 (portrait) or 1920x1080 (landscape), 2-8 images |
| **Short Description** | Max 80 characters |
| **Full Description** | Max 4000 characters |

### Asset Recommendations

**Icon**:
- Simple, recognizable design
- Works at small sizes
- No text (won't be readable)
- Consistent with your brand

**Screenshots**:
- Show key features
- Include wallet connection flow
- Show transaction screens
- Demonstrate unique functionality

**Description**:
- Lead with value proposition
- Include key features
- Mention Solana/crypto functionality
- Add contact/support info

---

## Step 3: Create Publisher Account

1. Go to [publish.solanamobile.com](https://publish.solanamobile.com)
2. Click "Sign Up"
3. Complete your publisher profile
4. Submit KYC/KYB verification (required)
5. Wait for approval (typically 1-3 business days)

---

## Step 4: Connect Wallet & Set Storage

### Connect Publisher Wallet

1. Connect a Solana wallet (Phantom, Solflare, Backpack)
2. This becomes your **publisher wallet**
3. Ensure it has ~0.2 SOL for transaction fees

> **Important**: Keep this wallet secure. You'll need it for all future updates.

### Select Storage Provider

Choose where app assets are stored:

| Provider | Pros | Cons |
|----------|------|------|
| **ArDrive** (Recommended) | Permanent, cheaper | Requires SOL |
| **AWS S3** | Familiar, fast | Requires AWS setup |

ArDrive is recommended for most developers.

---

## Step 5: Submit Your App

### Add dApp Details

1. Click "Add a dApp" > "New dApp"
2. Fill in the form:

| Field | Description |
|-------|-------------|
| **App Name** | Your app's display name |
| **Package ID** | Must match APK (e.g., `com.example.app`) |
| **Category** | DeFi, NFT, Gaming, Social, Tools, etc. |
| **Short Description** | 80 char summary |
| **Full Description** | Detailed description with features |
| **Website** | Your app's website |
| **Support Email** | For user support |
| **Privacy Policy URL** | Required - link to your privacy policy |

3. Upload assets (icon, screenshots)
4. Save the form

### Upload APK

1. Go to your app's **Home** menu
2. Click "New Version" in the top-right
3. Upload your `app-release-signed.apk`
4. Click "Submit"

### Sign Transactions

You'll be prompted to sign multiple transactions:
- Asset uploads to Arweave
- NFT minting (Publisher, App, Release)

> **Important**: Approve ALL signing requests. Skipping any will cause missing assets.

---

## Step 6: App Review

### Review Process

- **Timeline**: 2-5 business days
- **Communication**: Via developer email
- **Status**: Check in Publisher Portal

### Common Rejection Reasons

| Issue | Solution |
|-------|----------|
| **Missing privacy policy** | Add a valid privacy policy URL |
| **Misleading description** | Accurately describe app functionality |
| **Broken functionality** | Test thoroughly before submission |
| **Policy violation** | Review [Publisher Policy](https://docs.solanamobile.com/dapp-publishing/publisher-policy) |
| **Poor quality screenshots** | Use high-quality, accurate screenshots |

### After Approval

Once approved, your app is immediately available in the dApp Store under its category.

---

## Updating Your App

### Submit New Version

1. Build new APK with updated `versionCode` in `twa-manifest.json`
2. Run `bubblewrap update && bubblewrap build`
3. Go to Publisher Portal > Your App > "New Version"
4. Upload new APK and submit

### Update Metadata

Metadata can be updated without a new APK:
1. Go to your app in Publisher Portal
2. Edit details
3. Save and submit for review

---

## PWA-Specific Considerations

### No APK Update Needed for Web Changes

Since your app is a TWA wrapper, web content updates don't require a new APK:
- Deploy web changes to your hosting
- Users see updates immediately
- No app store review needed

### When APK Updates ARE Needed

Update your APK when:
- Changing app icon
- Modifying splash screen
- Updating TWA configuration
- Changing package ID
- Updating signing key (not recommended)

---

## Policies & Guidelines

### Publisher Policy Highlights

- No illegal content
- No malicious code or security exploits
- Accurate app descriptions
- Respect user privacy
- No impersonation
- Proper content ratings

### Crypto-Specific Rules

- No pump-and-dump schemes
- No fake token promotions
- Accurate token/NFT information
- Clear transaction disclosures
- Compliant with regulations

Full policy: [docs.solanamobile.com/dapp-publishing/publisher-policy](https://docs.solanamobile.com/dapp-publishing/publisher-policy)

---

## Troubleshooting

### "Insufficient SOL" Error

Ensure your wallet has at least 0.2 SOL. ArDrive uploads require SOL for permanent storage.

### APK Upload Fails

1. Verify APK is properly signed
2. Check file size (some limits may apply)
3. Ensure package ID matches your records

### Signing Requests Fail

1. Ensure wallet is connected
2. Try refreshing the page
3. Check wallet has sufficient SOL
4. Try a different browser

### App Rejected

1. Read rejection feedback carefully
2. Address all issues mentioned
3. Resubmit with fixes
4. Contact support if unclear

---

## Support & Resources

### Getting Help

- **Discord**: [discord.gg/solanamobile](https://discord.gg/solanamobile) (`#dapp-store` channel)
- **Email**: concerns@dappstore.solanamobile.com
- **Documentation**: [docs.solanamobile.com](https://docs.solanamobile.com)

### Useful Links

- [Publisher Portal](https://publish.solanamobile.com)
- [Publisher Policy](https://docs.solanamobile.com/dapp-publishing/publisher-policy)
- [Developer Agreement](https://docs.solanamobile.com/dapp-publishing/agreement)
- [Listing Page Guidelines](https://docs.solanamobile.com/dapp-publishing/listing-page-guidelines)

---

## Checklist Summary

Before submitting:

- [ ] APK built and signed
- [ ] Digital Asset Links deployed
- [ ] Tested on real devices
- [ ] Publisher account created
- [ ] KYC/KYB approved
- [ ] Wallet connected with ~0.2 SOL
- [ ] App icon (512x512)
- [ ] Screenshots (2-8)
- [ ] Privacy policy URL
- [ ] Description written
- [ ] Category selected
- [ ] Policy reviewed
