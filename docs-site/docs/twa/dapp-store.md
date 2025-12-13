# Solana dApp Store

Publish your TWA to the Solana dApp Store.

## Overview

The Solana dApp Store is a decentralized app marketplace for Solana Mobile devices (Saga, Seeker). Unlike Google Play, it:

- **No 30% fee** - Keep 100% of revenue
- **Crypto-native** - Accepts SOL payments
- **Decentralized** - On-chain app registry
- **Mobile-focused** - Built for Solana Mobile devices

## Prerequisites

- Built TWA APK or AAB
- Deployed PWA with Digital Asset Links
- Solana wallet with SOL for fees
- App icons and screenshots

## Prepare Your App

### Required Assets

| Asset | Specification |
|-------|---------------|
| App Icon | 512x512 PNG |
| Feature Graphic | 1024x500 PNG |
| Screenshots | 1080x1920 (portrait) or 1920x1080 (landscape) |
| Short Description | Max 80 characters |
| Full Description | Max 4000 characters |

### App Bundle

Use the AAB (Android App Bundle) for dApp Store:

```bash
# Your AAB is at:
twa/app-release-bundle.aab
```

## Submission Process

### 1. Create Publisher Account

1. Visit [dApp Store Publisher Portal](https://publish.solanamobile.com)
2. Connect your Solana wallet
3. Complete publisher profile

### 2. Create App Listing

Fill in app details:

```
App Name: Your App Name
Package Name: com.yourcompany.yourapp
Category: DeFi / NFT / Games / Social / Utility
Content Rating: Everyone / Teen / Mature
```

### 3. Upload Assets

- Upload AAB file
- Add screenshots (min 2, max 8)
- Add feature graphic
- Set app icon

### 4. Write Description

**Short Description (80 chars):**
```
Mobile-first Solana wallet with seamless MWA integration.
```

**Full Description:**
```
[Your App Name] brings the power of Solana to your mobile device.

Features:
• Connect any Solana wallet via Mobile Wallet Adapter
• Send and receive SOL and SPL tokens
• View transaction history
• Dark mode support
• Works offline

Built with the latest web technologies for a fast, native-like experience.
```

### 5. Set Pricing

- **Free** - No cost to users
- **Paid** - Set price in SOL or USDC
- **In-app purchases** - Configure separately

### 6. Submit for Review

Review typically takes 1-3 business days.

## Policies

### Content Guidelines

✅ Allowed:
- DeFi applications
- NFT marketplaces
- Games
- Social apps
- Utility tools

❌ Not Allowed:
- Malware or harmful content
- Misleading apps
- Apps that violate Solana Mobile ToS

### Technical Requirements

| Requirement | Value |
|-------------|-------|
| Min SDK | 24 (Android 7.0) |
| Target SDK | 33+ recommended |
| APK/AAB signed | Yes |
| Asset Links | Configured |

## Updates

### Releasing Updates

1. Increment version in `twa-manifest.json`:
   ```json
   {
     "appVersionCode": 2,
     "appVersionName": "1.1.0"
   }
   ```

2. Rebuild:
   ```bash
   bubblewrap build
   ```

3. Upload new AAB to publisher portal

4. Submit for review

### Version Code Rules

- Must always increase
- Cannot reuse old version codes
- Integer only (1, 2, 3...)

## Best Practices

### Screenshots

1. Show actual app functionality
2. Highlight unique features
3. Use consistent styling
4. Include wallet connection flow
5. Show light and dark modes

### Description

1. Lead with benefits
2. List key features
3. Include keywords for search
4. Be honest about functionality
5. Update regularly

### Ratings & Reviews

1. Respond to user feedback
2. Fix reported bugs promptly
3. Thank positive reviewers
4. Address concerns professionally

## Promotion

### In-App Promotion

Add dApp Store badge to your website:

```html
<a href="https://solanadappstore.com/app/com.yourpackage">
  <img src="/dapp-store-badge.png" alt="Get it on dApp Store">
</a>
```

### Social Media

- Announce launch on Twitter/X
- Share in Solana Discord
- Post on relevant subreddits
- Create launch thread

## Analytics

Track your app's performance:

- Download count
- Active installs
- User ratings
- Crash reports

Access via Publisher Portal dashboard.

## Support

- **Publisher Support:** publisher-support@solanamobile.com
- **Documentation:** [docs.solanamobile.com](https://docs.solanamobile.com)
- **Discord:** Solana Mobile channel

## Checklist

- [ ] TWA built and tested
- [ ] Digital Asset Links configured
- [ ] Publisher account created
- [ ] App icon (512x512)
- [ ] Feature graphic (1024x500)
- [ ] Screenshots (min 2)
- [ ] Short description (80 chars)
- [ ] Full description
- [ ] Privacy policy URL
- [ ] AAB uploaded
- [ ] Submitted for review
