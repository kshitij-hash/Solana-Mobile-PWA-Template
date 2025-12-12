# Grant Proposal: Solana Mobile PWA Improved Template

## Project Overview

**RFP:** Solana Mobile PWA Improved Template
**Requested Amount:** $5,000 USDC
**Status:** ✅ **COMPLETE - All Deliverables Ready**

---

## Executive Summary

This proposal delivers a **production-ready PWA template** with Mobile Wallet Adapter integration, enhanced TWA configuration with Chrome browser preference, and mobile-optimized UI components. All deliverables are complete and ready for review.

---

## Deliverables Status

### ✅ Milestone 1: Core PWA Template (COMPLETE)

| Deliverable | Status | Location |
|-------------|--------|----------|
| Next.js 14 PWA with App Router | ✅ | `src/app/` |
| Optimized web manifest | ✅ | `public/manifest.json` |
| Service worker with caching | ✅ | `next-pwa` configured |
| Mobile-first responsive layout | ✅ | `src/styles/mobile.css` |
| Safe area handling (CSS env()) | ✅ | `src/styles/mobile.css` |
| MWA integration | ✅ | `src/components/wallet/` |

### ✅ Milestone 2: Enhanced UI Components (COMPLETE)

| Deliverable | Status | Location |
|-------------|--------|----------|
| Hybrid splash screen system | ✅ | `src/components/splash/SplashScreen.tsx` |
| Animated splash (Framer Motion) | ✅ | `src/components/splash/AnimatedSplashScreen.tsx` |
| Bottom navigation (48-56dp touch) | ✅ | `src/components/navigation/BottomNav.tsx` |
| Header with back navigation | ✅ | `src/components/navigation/Header.tsx` |
| Pull-to-refresh | ✅ | `src/components/ui/PullToRefresh.tsx` |
| Toast notifications | ✅ | `src/components/ui/Toast.tsx` |
| Animated components library | ✅ | `src/components/ui/AnimatedComponents.tsx` |

### ✅ Milestone 3: TWA Configuration (COMPLETE)

| Deliverable | Status | Location |
|-------------|--------|----------|
| Production-ready twa-manifest.json | ✅ | `twa/twa-manifest.json` |
| Custom LauncherActivity.java | ✅ | `twa/CustomLauncherActivity.java` |
| Chrome browser preference | ✅ | Build script applies patch |
| Build scripts | ✅ | `twa/scripts/build-twa.sh` |
| Digital Asset Links setup | ✅ | `public/.well-known/assetlinks.json` |
| Signing documentation | ✅ | `docs/TWA-GUIDE.md` |

### ✅ Milestone 4: Documentation & Polish (COMPLETE)

| Deliverable | Status | Location |
|-------------|--------|----------|
| Comprehensive README | ✅ | `README.md` |
| Setup guide | ✅ | `docs/SETUP.md` |
| TWA workflow guide | ✅ | `docs/TWA-GUIDE.md` |
| Customization guide | ✅ | `docs/CUSTOMIZATION.md` |
| dApp Store publishing guide | ✅ | `docs/PUBLISHING.md` |
| Video walkthrough scripts | ✅ | `docs/VIDEO-WALKTHROUGH.md` |

### ✅ Bonus: CLI Scaffolding Tool (COMPLETE)

| Deliverable | Status | Location |
|-------------|--------|----------|
| npx create-solana-pwa CLI | ✅ | `cli/index.js` |
| CLI documentation | ✅ | `cli/README.md` |
| npm package config | ✅ | `cli/package.json` |

---

## Technical Implementation

### 1. Hybrid Splash Screen System

**Native Layer (Android):** Configured via `twa-manifest.json` - displays instantly on app launch.

**PWA Layer (Web):** Enhanced animated splash using Framer Motion that overlays and transitions smoothly.

```tsx
// src/components/splash/AnimatedSplashScreen.tsx
export function AnimatedSplashScreen({ onComplete }) {
  // Detects standalone/TWA mode
  // Shows animated logo, app name, loading dots
  // Smooth fade-out transition
}
```

### 2. Chrome Browser Preference

Custom `LauncherActivity` that extends `android-browser-helper` to explicitly prefer Chrome:

```java
// twa/CustomLauncherActivity.java
public class CustomLauncherActivity extends LauncherActivity {
    @Override
    protected TwaLauncher createTwaLauncher() {
        String[] chromePackages = {CHROME_PACKAGE, CHROME_BETA, CHROME_DEV};
        for (String packageName : chromePackages) {
            if (isPackageInstalled(packageName)) {
                return new TwaLauncher(this, packageName);
            }
        }
        return super.createTwaLauncher();  // Graceful fallback
    }
}
```

### 3. Mobile-Optimized Navigation

**Bottom Navigation:**
- 48-56dp touch targets (WCAG accessibility compliant)
- Safe area padding for gesture navigation bars
- Active state indicators

```tsx
// src/components/navigation/BottomNav.tsx
<nav className="bottom-nav">
  {items.map((item) => (
    <NavItem key={item.href} {...item} />
  ))}
</nav>
```

**Safe Area CSS:**
```css
/* src/styles/mobile.css */
:root {
  --sat: env(safe-area-inset-top);
  --sab: env(safe-area-inset-bottom);
}

.bottom-nav {
  height: calc(56px + var(--sab));
  padding-bottom: var(--sab);
}
```

### 4. Animated Components Library

Built with Framer Motion for smooth, performant animations:

- `PageTransition` - Route transition wrapper
- `AnimatedCard` - Cards with hover/tap effects
- `AnimatedButton` - Buttons with spring animations
- `BottomSheet` - Slide-up modal sheets
- `AnimatedToast` - Toast notifications
- `AnimatedSpinner` - Loading indicator
- `Skeleton` - Loading placeholders
- `AnimatedNumber` - Number counter animations

### 5. Pull-to-Refresh

Native-feeling pull gesture support:

```tsx
// src/components/ui/PullToRefresh.tsx
<PullToRefresh onRefresh={async () => {
  await refetchData();
}}>
  <Content />
</PullToRefresh>
```

---

## Project Structure

```
solana-mobile-pwa-template/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Home page (balance + quick actions)
│   │   ├── wallet/page.tsx           # Wallet details page
│   │   ├── send/page.tsx             # Send SOL page
│   │   ├── settings/page.tsx         # Settings page
│   │   └── providers.tsx             # Context providers
│   │
│   ├── components/
│   │   ├── navigation/
│   │   │   ├── BottomNav.tsx         # Mobile bottom nav
│   │   │   └── Header.tsx            # Top header
│   │   │
│   │   ├── splash/
│   │   │   ├── SplashScreen.tsx      # CSS-based splash
│   │   │   └── AnimatedSplashScreen.tsx  # Framer Motion splash
│   │   │
│   │   ├── wallet/
│   │   │   ├── WalletProvider.tsx    # Wallet context
│   │   │   └── WalletButton.tsx      # Connect button
│   │   │
│   │   └── ui/
│   │       ├── Toast.tsx             # Toast notifications
│   │       ├── PullToRefresh.tsx     # Pull gesture
│   │       └── AnimatedComponents.tsx # Animation library
│   │
│   ├── hooks/
│   │   ├── useGuardedCallback.ts     # MWA error suppression
│   │   ├── usePullToRefresh.ts       # Pull-to-refresh hook
│   │   ├── usePWAInstall.ts          # PWA install prompt
│   │   └── useSafeArea.ts            # Safe area detection
│   │
│   ├── lib/
│   │   └── mwa.ts                    # MWA registration
│   │
│   ├── contexts/
│   │   └── NetworkContext.tsx        # Network provider
│   │
│   └── styles/
│       ├── mobile.css                # Mobile-first styles
│       └── splash.css                # Splash screen styles
│
├── public/
│   ├── manifest.json                 # PWA manifest
│   ├── icons/                        # App icons
│   └── .well-known/
│       └── assetlinks.json           # Digital Asset Links
│
├── twa/                              # TWA configuration
│   ├── twa-manifest.json             # Bubblewrap manifest
│   ├── CustomLauncherActivity.java   # Chrome preference
│   └── scripts/
│       └── build-twa.sh              # Build script
│
├── cli/                              # CLI scaffolding tool
│   ├── index.js                      # CLI entry point
│   ├── package.json                  # npm package config
│   └── README.md                     # CLI documentation
│
├── docs/
│   ├── SETUP.md                      # Setup guide
│   ├── TWA-GUIDE.md                  # TWA workflow
│   ├── CUSTOMIZATION.md              # Theming guide
│   ├── PUBLISHING.md                 # dApp Store guide
│   └── VIDEO-WALKTHROUGH.md          # Video scripts
│
├── package.json                      # Dependencies
├── README.md                         # Main documentation
└── PROPOSAL.md                       # This file
```

---

## Technical Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS Variables |
| Animations | Framer Motion |
| Wallet | @solana-mobile/wallet-standard-mobile |
| Web3 | @solana/web3.js |
| TWA | Bubblewrap CLI (@bubblewrap/cli) |
| Icons | Lucide React |
| PWA | next-pwa |

---

## Quick Start

### Using the CLI

```bash
npx create-solana-pwa my-dapp
cd my-dapp
npm run dev
```

### Manual Setup

```bash
git clone https://github.com/[username]/solana-mobile-pwa-template.git my-dapp
cd my-dapp
npm install
npm run dev
```

### Build TWA

```bash
cd twa
./scripts/build-twa.sh
```

---

## Success Criteria Met

| Criteria | Status | Notes |
|----------|--------|-------|
| Template builds to working APK | ✅ | `build-twa.sh` generates signed APK |
| APK opens in Chrome | ✅ | Custom LauncherActivity forces Chrome |
| Professional animated splash | ✅ | Two-layer hybrid system |
| Chrome preference with fallback | ✅ | Graceful degradation to system default |
| Mobile UX (nav, safe areas, gestures) | ✅ | Full implementation |
| MWA integration works | ✅ | Tested with wallet-adapter |
| Developer can publish in < 1 hour | ✅ | Comprehensive docs |
| MIT licensed, well-documented | ✅ | All code documented |

---

## Budget Breakdown

| Item | Amount | Status |
|------|--------|--------|
| PWA template development | $1,500 | ✅ Complete |
| UI components (splash, nav, gestures) | $1,000 | ✅ Complete |
| TWA configuration & Chrome preference | $800 | ✅ Complete |
| MWA integration | $500 | ✅ Complete |
| Documentation & tutorials | $700 | ✅ Complete |
| Testing & device compatibility | $500 | ✅ Complete |
| **Total** | **$5,000** | **✅ All Complete** |

---

## Video Tutorial Scripts

Complete video tutorial scripts are available in `docs/VIDEO-WALKTHROUGH.md`:

1. **Quick Start (3 min)** - Getting started in under 3 minutes
2. **MWA Deep Dive (5 min)** - How Mobile Wallet Adapter works
3. **Building the TWA (8 min)** - Converting PWA to Android app
4. **Publishing to dApp Store (6 min)** - Submission process
5. **Mobile-First Design (5 min)** - Building mobile-optimized UIs

---

## References

- [Bubblewrap CLI](https://github.com/GoogleChromeLabs/bubblewrap)
- [Solana Mobile Docs](https://docs.solanamobile.com)
- [TWA Quick Start](https://developer.chrome.com/docs/android/trusted-web-activity/quick-start)
- [PWA Best Practices](https://web.dev/learn/pwa/app-design)
- [MWA for Web Apps](https://docs.solanamobile.com/mobile-wallet-adapter/web-apps)

---

## License

MIT
