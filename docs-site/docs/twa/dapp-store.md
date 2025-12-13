# Solana dApp Store

Publish your TWA to the Solana dApp Store.

## Overview

The Solana dApp Store is a decentralized app marketplace for Solana Mobile devices (Saga, Seeker). Publishing involves creating NFTs that describe your app on-chain and submitting for review via the Publisher Portal.

**Key Benefits:**
- **No platform fees** - 0% commission on app sales
- **Crypto-native** - Accepts SOL payments
- **NFT-based publishing** - App metadata stored on-chain
- **Self-service** - Publish whenever you're ready

## Before You Begin

Before starting the publishing process, review these important documents:

- [Publisher Policy](https://docs.solanamobile.com/dapp-publishing/publisher-policy) - Content guidelines and requirements
- [Developer Agreement](https://docs.solanamobile.com/dapp-publishing/agreement) - Terms for all submissions

## Prerequisites

- **Release APK** - Signed with a unique signing key (not your Google Play key)
- **Publisher wallet** - Solana wallet with ~0.2 SOL for fees and storage
- **App metadata** - Name, description, screenshots, icon
- **Digital Asset Links** - Configured for your TWA

::: warning Important
Your publisher wallet is required for all future submissions. Do not lose access to it or you will not be able to make updates to your app.
:::

## Prepare Your Assets

### Required Assets

| Asset | Specification |
|-------|---------------|
| App Icon | 512x512 PNG |
| Banner Graphic | 1200x600 PNG (required) |
| Feature Graphic | 1200x1200 PNG (optional, for Editor's Choice) |
| Screenshots/Videos | Minimum 4, at least 1080px width/height |
| Short Description | Max 30 characters |
| Long Description | Well-written overview of features |

### Screenshot & Video Requirements

**Images:**
- Minimum 1080px in width and height
- Consistent orientation (all landscape or all portrait)
- Equal aspect ratio across all images

**Videos:**
- Minimum 720px width/height (1080p recommended)
- Must be `.mp4` format

### APK Requirements

Your APK must be:
- A **release build** (debug builds not accepted)
- Signed with a **new, unique signing key** exclusively for dApp Store
- Different from your Google Play signing key (if applicable)

::: danger Critical
You cannot use the same signing key for both Google Play and the dApp Store. Create a separate key for dApp Store submissions.
:::

## Submission Process

### 1. Create Publisher Account

1. Navigate to [Publisher Portal](https://publish.solanamobile.com)
2. Sign up for an account
3. Complete your publisher profile
4. Submit KYC/KYB verification

### 2. Connect Publisher Wallet

1. Connect a Solana wallet via browser extension (Phantom, Solflare, Backpack)
2. Ensure wallet has sufficient SOL (~0.2 SOL) for transaction fees and storage

### 3. Set Storage Provider

Select where your dApp assets (APK, icon, screenshots, etc.) will be stored:

- **ArDrive** (Recommended) - Lower storage costs, easy setup
- Use the storage cost estimator to calculate required SOL based on app size

### 4. Add Your dApp Details

1. Click "Add a dApp" > "New dApp" in the sidebar
2. Fill out the app details form:
   - App name
   - Short description (max 30 chars)
   - Long description
   - Category
   - Screenshots and videos
3. Save the form (can be edited before submission)

### 5. Submit Your Release

1. Navigate to your app's **Home** menu
2. Click "New Version" in the top-right
3. Upload your signed APK
4. Click "Submit"
5. **Approve all signing requests** - Required for uploading to Arweave and minting your release NFT

::: warning
Ensure you approve each signing request. Skipping any may result in missing assets in your submission.
:::

## App Review

After submission, your app enters the review queue:

- **Review time:** 2-5 business days
- **Notification:** You'll receive an email when approved or if changes are needed
- **Go live:** Approved apps are listed immediately under the appropriate category

### Get in Contact

For questions about publishing, app review, or launching:

1. Join [Solana Mobile Discord](https://discord.gg/solanamobile)
2. Visit the `#dapp-store` channel for instructions

## Content Guidelines

### Allowed Content

- DeFi applications
- NFT marketplaces and tools
- Games
- Social apps
- Utility tools
- Wallets

### Restricted Content

The following is **not allowed**:

- Illegal content or content promoting illegal activity
- Hate speech or content promoting violence
- Misleading or deceptive content
- Malware or security exploits
- Content that falsely claims affiliations
- Pornography or sexually explicit content
- Apps that collect user data without proper disclosure

See the full [Publisher Policy](https://docs.solanamobile.com/dapp-publishing/publisher-policy) for complete guidelines.

## Releasing Updates

### Version Update Process

1. Update version in `twa-manifest.json`:
   ```json
   {
     "appVersionCode": 2,
     "appVersionName": "1.1.0"
   }
   ```

2. Rebuild your TWA:
   ```bash
   cd twa
   ./scripts/build-twa.sh
   ```

3. Go to Publisher Portal > Your App > "New Version"
4. Upload the new APK
5. Submit for review

### Version Code Rules

- Must always increment (1, 2, 3...)
- Cannot reuse old version codes
- Integer values only

## Deep Linking to Your Listing

Link directly to your app's listing page using this scheme:

```
https://dappstore.solanamobile.com/app/<package_name>
```

Example:
```html
<a href="https://dappstore.solanamobile.com/app/com.yourcompany.yourapp">
  Get it on Solana dApp Store
</a>
```

## Publishing from Google Play

If you already have an app on Google Play:

1. **Create new signing key** for dApp Store:
   ```bash
   keytool -genkey -v -keystore dappstore.keystore \
     -alias dappstore \
     -keyalg RSA \
     -keysize 2048 \
     -validity 10000
   ```

2. **Build signed APK** (not AAB - dApp Store requires APK)

3. **Verify APK signature**:
   ```bash
   apksigner verify --print-certs app-release.apk
   ```

4. Follow standard submission process above

## Best Practices

### Listing Page

- **App Icon:** Thoughtfully designed to convey your brand
- **App Name:** Unique, memorable, suggests core functionality
- **Short Description:** Elevator pitch that captures attention
- **Long Description:** Clear overview of features and functionality
- **Screenshots:** Highlight core features, tell a visual story
- **Videos:** Showcase main features, UI flow, and user experience

### Security

- Store your signing keystore securely
- Use encryption for any user data
- Follow security best practices for wallet interactions
- Test thoroughly on Android devices before submission

## Support & Resources

- **Publisher Portal:** [publish.solanamobile.com](https://publish.solanamobile.com)
- **Documentation:** [docs.solanamobile.com](https://docs.solanamobile.com)
- **Discord:** [discord.gg/solanamobile](https://discord.gg/solanamobile) (`#dapp-store` channel)
- **Report Issues:** concerns@dappstore.solanamobile.com

## Publishing Checklist

- [ ] TWA built and tested on Android device
- [ ] Digital Asset Links configured and verified
- [ ] Publisher account created and verified
- [ ] Publisher wallet connected with ~0.2 SOL
- [ ] App icon (512x512 PNG)
- [ ] Banner graphic (1200x600 PNG)
- [ ] Screenshots/videos (min 4, 1080px+)
- [ ] Short description (max 30 chars)
- [ ] Long description
- [ ] Privacy policy URL
- [ ] Release APK signed with dApp Store key
- [ ] Reviewed Publisher Policy and Developer Agreement
- [ ] Submitted for review
