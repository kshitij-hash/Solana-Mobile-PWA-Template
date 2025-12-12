# Google Play Store

Optionally publish your TWA to Google Play Store.

## Overview

While the Solana dApp Store is recommended for Solana apps, you can also publish to Google Play for broader reach.

::: warning
Google Play has stricter policies around crypto apps. Ensure compliance before submitting.
:::

## Prerequisites

- Google Play Developer account ($25 one-time fee)
- Built AAB file
- Digital Asset Links configured
- Privacy policy URL
- App meets Google Play policies

## Play App Signing

Google Play uses its own signing key for distribution:

### How It Works

1. You upload AAB signed with your **upload key**
2. Google re-signs with their **app signing key**
3. Users get APK signed by Google's key

### Get Play's Fingerprint

1. Go to Play Console → Your App → Setup → App signing
2. Find "App signing key certificate"
3. Copy SHA-256 fingerprint

### Update Asset Links

Add both fingerprints to `assetlinks.json`:

```json
{
  "sha256_cert_fingerprints": [
    "YOUR_UPLOAD_KEY_FINGERPRINT",
    "GOOGLE_PLAY_SIGNING_FINGERPRINT"
  ]
}
```

## Submission Process

### 1. Create App

1. Go to [Play Console](https://play.google.com/console)
2. Click "Create app"
3. Fill in app details

### 2. Store Listing

| Field | Requirement |
|-------|-------------|
| App name | Max 30 characters |
| Short description | Max 80 characters |
| Full description | Max 4000 characters |
| App icon | 512x512 PNG |
| Feature graphic | 1024x500 PNG |
| Screenshots | Min 2, various sizes |

### 3. Content Rating

Complete the content rating questionnaire:

1. Go to Policy → App content → Content ratings
2. Answer questions about your app
3. Receive IARC rating

### 4. Target Audience

Select target audience:
- Not primarily for children (recommended for crypto apps)

### 5. Upload AAB

1. Go to Release → Production
2. Create new release
3. Upload `app-release-bundle.aab`
4. Add release notes

### 6. Review & Publish

Submit for review (typically 1-7 days).

## Crypto App Policies

### Financial Services

Google requires disclosure for:
- Cryptocurrency exchanges
- Wallet apps
- DeFi services

### Required Declarations

1. **Financial features declaration**
2. **Blockchain-based content disclosure**
3. **Target country compliance**

### Restrictions

- No mining apps
- No ICO promotion
- Must comply with local laws

## TWA-Specific Requirements

### Verification Badge

Google may show "Verified" badge if:
- Digital Asset Links properly configured
- App passes TWA quality checks

### Quality Guidelines

1. **Offline handling** - Show meaningful offline state
2. **Navigation** - Handle back button properly
3. **Orientation** - Support device rotation (or lock orientation)
4. **Responsiveness** - App must be responsive

## Updates

### Staged Rollouts

```
10% → 25% → 50% → 100%
```

Gradually release to catch issues early.

### Release Notes

```
Version 1.1.0:
- Added dark mode support
- Improved wallet connection
- Bug fixes and performance improvements
```

## Pricing

- **Free** - Most common for crypto apps
- **Paid** - Google takes 15-30% commission
- **In-app purchases** - Requires Google Play Billing (30% fee)

::: tip
Consider free on Play Store, premium features on dApp Store (0% fee).
:::

## Analytics

Google Play Console provides:
- Install statistics
- Crash reports
- ANR (App Not Responding) reports
- User reviews
- Revenue data

## Common Rejection Reasons

1. **Misleading description** - Be accurate about features
2. **Broken functionality** - Test thoroughly
3. **Policy violations** - Review crypto policies
4. **Missing privacy policy** - Required for all apps
5. **Incomplete store listing** - Fill all required fields

## Support

- [Play Console Help](https://support.google.com/googleplay/android-developer)
- [Policy Center](https://play.google.com/about/developer-content-policy)
- [Developer Community](https://support.google.com/googleplay/android-developer/community)

## Comparison

| Feature | dApp Store | Play Store |
|---------|------------|------------|
| Commission | 0% | 15-30% |
| Crypto-friendly | ✅ | ⚠️ Restrictions |
| Reach | Solana Mobile users | All Android |
| Review time | 1-3 days | 1-7 days |
| Payments | SOL/USDC | Fiat via Google |

## Recommendation

1. **Start with dApp Store** - Native Solana audience
2. **Add Play Store later** - For broader reach
3. **Maintain both** - Different user bases
