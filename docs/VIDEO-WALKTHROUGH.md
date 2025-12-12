# Solana Mobile PWA Template - Video Walkthrough Guide

This document provides detailed storyboards and scripts for creating video tutorials about the PWA template.

---

## Video 1: Quick Start (3 minutes)

### Goal
Show developers how to get started with the template in under 3 minutes.

### Script

**Scene 1: Introduction (15 seconds)**
```
"In this video, I'll show you how to create a mobile-first Solana dApp
with Mobile Wallet Adapter support in under 3 minutes."
```

**Scene 2: Create Project (30 seconds)**
```bash
# Terminal
npx create-solana-pwa my-solana-dapp
cd my-solana-dapp
npm run dev
```

**Scene 3: Show Running App (30 seconds)**
- Open browser to localhost:3000
- Show the mobile-optimized UI
- Point out the bottom navigation
- Show the "Connect Wallet" button

**Scene 4: Connect Wallet on Mobile (45 seconds)**
- Open the app on a real Android device
- Tap "Connect Wallet"
- Show MWA appearing in wallet list
- Select Phantom/Solflare
- Show the native wallet app opening
- Approve connection
- Show connected state with address displayed

**Scene 5: Project Structure Overview (45 seconds)**
```
Show IDE with project open:
- src/app/ - "Next.js pages"
- src/components/ - "Reusable components"
- src/styles/mobile.css - "Mobile-first styles"
- public/manifest.json - "PWA configuration"
- twa/ - "Android TWA config"
```

**Scene 6: Conclusion (15 seconds)**
```
"That's it! You now have a production-ready mobile Solana dApp.
Check out our other videos for building TWA and publishing to the dApp Store."
```

---

## Video 2: Mobile Wallet Adapter Deep Dive (5 minutes)

### Goal
Explain how MWA works and show integration details.

### Script

**Scene 1: What is MWA? (60 seconds)**
```
"Mobile Wallet Adapter is the protocol that lets web dApps
communicate with native wallet apps on Android.

When a user clicks 'Connect Wallet', MWA opens their installed
wallet app - like Phantom or Solflare - for authentication.

This is different from browser extension wallets because it uses
the native app, which is more secure and provides a better UX."
```

**Scene 2: Code Walkthrough - WalletProvider.tsx (90 seconds)**
```tsx
// Show the WalletProvider component
import { SolanaMobileWalletAdapter } from '@solana-mobile/wallet-adapter-mobile';

// Highlight the key parts:
// 1. Network configuration
// 2. Wallet adapters array
// 3. SolanaMobileWalletAdapter options
```

**Scene 3: Using the Wallet Hook (60 seconds)**
```tsx
import { useWallet } from '@solana/wallet-adapter-react';

function MyComponent() {
  const { connected, publicKey, sendTransaction } = useWallet();

  // Show how to check connection
  // Show how to get wallet address
  // Show how to send a transaction
}
```

**Scene 4: Handling Mobile vs Desktop (60 seconds)**
```tsx
// Show environment detection
const isMobile = /Android|iPhone/i.test(navigator.userAgent);

// Explain different UX for mobile vs desktop
// Mobile: MWA opens native app
// Desktop: Browser extension or mobile QR
```

**Scene 5: Demo on Device (60 seconds)**
- Live demo showing wallet connection
- Sign a message
- Send a transaction
- Show the wallet app UI

---

## Video 3: Building the TWA (8 minutes)

### Goal
Walk through converting the PWA into an Android app.

### Script

**Scene 1: What is TWA? (60 seconds)**
```
"A Trusted Web Activity wraps your PWA in a native Android app.
It's like embedding Chrome into an app, but without the browser UI.

The app opens your website in fullscreen, and users can't tell
it's a web app. Perfect for the Solana dApp Store."
```

**Scene 2: Prerequisites (60 seconds)**
```
Show requirements:
- Java JDK 11+
- Android SDK
- Node.js
- A deployed PWA
```

**Scene 3: Configure twa-manifest.json (120 seconds)**
```json
{
  "name": "My Solana dApp",
  "packageId": "com.example.mydapp",
  "host": "mydapp.com",
  // Explain each field
}
```

**Scene 4: Digital Asset Links (90 seconds)**
```
"Digital Asset Links prove you own both the domain and the Android app.
Without this, users will see a browser URL bar."
```

Show:
1. Generate signing key
2. Get SHA256 fingerprint
3. Update assetlinks.json
4. Deploy to `.well-known/`

**Scene 5: Build the APK (120 seconds)**
```bash
cd twa
./scripts/build-twa.sh
```

Show the build process:
- Bubblewrap generating Android project
- CustomLauncherActivity for Chrome preference
- Gradle building the APK

**Scene 6: Test the APK (60 seconds)**
```bash
adb install app-release-signed.apk
```

Show:
- Installing on device
- Opening the app
- Demonstrating fullscreen (no URL bar)
- Wallet connection working

---

## Video 4: Publishing to dApp Store (6 minutes)

### Goal
Guide through the Solana dApp Store submission process.

### Script

**Scene 1: dApp Store Overview (45 seconds)**
```
"The Solana dApp Store is a curated marketplace for Solana apps.
Unlike Google Play, it's specifically designed for crypto apps
and doesn't take a 30% cut of transactions."
```

**Scene 2: Prepare Assets (90 seconds)**
Show checklist:
- App icon (512x512)
- Screenshots (1080x1920)
- Feature graphic (1024x500)
- Description
- Privacy policy URL

**Scene 3: Create Publisher Account (60 seconds)**
- Go to publish.solanamobile.com
- Sign up with email
- Complete KYC/KYB verification

**Scene 4: Submit Your App (90 seconds)**
1. Click "Add a dApp"
2. Fill in app details
3. Upload APK
4. Upload screenshots
5. Submit for review

**Scene 5: Signing Transactions (45 seconds)**
Show:
- Connecting wallet
- Signing NFT minting transactions
- Uploading to Arweave

**Scene 6: After Submission (60 seconds)**
```
"Review typically takes 2-5 business days.
You'll receive an email when approved.

Remember: You can update web content anytime without
resubmitting - only submit a new APK when changing
the native wrapper configuration."
```

---

## Video 5: Mobile-First Design (5 minutes)

### Goal
Show how to build mobile-optimized UIs with the template.

### Script

**Scene 1: Safe Areas (90 seconds)**
```css
/* Show safe area CSS */
:root {
  --sat: env(safe-area-inset-top);
  --sab: env(safe-area-inset-bottom);
}

.header {
  padding-top: var(--sat);
}

.bottom-nav {
  padding-bottom: var(--sab);
}
```

Show on device:
- iPhone with notch
- Android with gesture bar
- How content adapts

**Scene 2: Touch Targets (60 seconds)**
```css
/* 48dp minimum touch targets */
.button {
  min-height: 48px;
  min-width: 48px;
}
```

Show:
- tapping small buttons (bad)
- tapping large buttons (good)

**Scene 3: Bottom Navigation (60 seconds)**
```tsx
// Show BottomNav component
<nav className="bottom-nav">
  <NavItem href="/" icon={<Home />} label="Home" />
  <NavItem href="/wallet" icon={<Wallet />} label="Wallet" />
</nav>
```

Explain:
- Why bottom nav for mobile
- Thumb zone accessibility
- Active state indicators

**Scene 4: Pull to Refresh (60 seconds)**
```tsx
<PullToRefresh onRefresh={async () => {
  await refetchData();
}}>
  <Content />
</PullToRefresh>
```

Demo:
- Pull down gesture
- Loading indicator
- Content refreshing

**Scene 5: PWA Installation (60 seconds)**
```tsx
const { isInstallable, promptInstall } = usePWAInstall();

if (isInstallable) {
  return <Button onClick={promptInstall}>Install App</Button>;
}
```

Show:
- Install banner on mobile
- Adding to home screen
- App launching in standalone mode

---

## Recording Guidelines

### Equipment
- Screen recording: OBS, Loom, or native
- Code editor: VS Code with large font (16-18pt)
- Terminal: Clear theme, no transparency
- Mobile device: Screen mirroring via scrcpy

### Style Guidelines
1. **Speak clearly** - Moderate pace, pause at transitions
2. **Show, don't tell** - Demonstrate actions as you explain
3. **Highlight code** - Use cursor or visual highlights
4. **Keep videos focused** - One topic per video
5. **Include timestamps** - Add chapters for navigation

### Post-Production
1. Add intro/outro slides
2. Include text overlays for key points
3. Add captions for accessibility
4. Compress to reasonable file size
5. Create thumbnail with Solana branding

---

## Suggested Platforms

1. **YouTube** - Main video hosting
2. **GitHub Readme** - Embed or link to videos
3. **Twitter/X** - Short clips for promotion
4. **Solana Mobile Discord** - Share in dev channels
5. **Dev.to / Medium** - Embed in written tutorials
