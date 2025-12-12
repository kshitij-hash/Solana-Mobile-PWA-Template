# Components Overview

The template includes a comprehensive set of mobile-optimized React components.

## UI Components

| Component | Description |
|-----------|-------------|
| [Splash Screen](/components/splash-screen) | Animated loading screen |
| [Bottom Navigation](/components/bottom-nav) | Mobile tab bar |
| [Pull to Refresh](/components/pull-to-refresh) | Native-feeling gesture |
| [Toast](/components/toast) | Notification messages |
| [Animated Components](/components/animated) | Framer Motion library |

## Wallet Components

| Component | Description |
|-----------|-------------|
| [Wallet Provider](/components/wallet-provider) | Solana wallet context |
| [Wallet Button](/components/wallet-button) | Connect/disconnect UI |

## File Structure

```
src/components/
├── navigation/
│   ├── BottomNav.tsx       # Tab navigation
│   └── Header.tsx          # Page header
│
├── splash/
│   ├── SplashScreen.tsx    # CSS splash
│   └── AnimatedSplashScreen.tsx  # Framer Motion splash
│
├── wallet/
│   ├── WalletProvider.tsx  # Context wrapper
│   └── WalletButton.tsx    # Connection button
│
└── ui/
    ├── Toast.tsx           # Notifications
    ├── PullToRefresh.tsx   # Pull gesture
    └── AnimatedComponents.tsx  # Animation library
```

## Usage Pattern

All components are designed for mobile-first use:

```tsx
import { BottomNav } from '@/components/navigation/BottomNav';
import { Header } from '@/components/navigation/Header';
import { PullToRefresh } from '@/components/ui/PullToRefresh';
import { Toast, useToast } from '@/components/ui/Toast';

export default function MyPage() {
  const { showToast, toastProps } = useToast();

  return (
    <>
      <Header title="My Page" showBack />

      <PullToRefresh onRefresh={async () => {
        await fetchData();
        showToast('Refreshed!', 'success');
      }}>
        <main>
          {/* Page content */}
        </main>
      </PullToRefresh>

      <BottomNav />
      <Toast {...toastProps} />
    </>
  );
}
```

## Design Principles

### Mobile-First

- 48px minimum touch targets
- Safe area handling built-in
- Gesture-friendly interactions

### Accessibility

- ARIA labels included
- Keyboard navigation support
- Screen reader compatible

### Performance

- Lazy loading where appropriate
- Optimized animations (60fps)
- Minimal bundle impact

## Customization

All components accept standard props and can be styled:

```tsx
// Custom className
<BottomNav className="my-custom-nav" />

// Override styles
<Header
  title="Custom"
  style={{ background: 'var(--color-primary)' }}
/>
```

See individual component pages for detailed customization options.
