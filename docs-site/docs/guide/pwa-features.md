# PWA Features

The template is a Progressive Web App with offline support, installability, and native-like behavior.

## Installation

### Manual Install

**On Mobile (Chrome):**
1. Open your deployed PWA in Chrome
2. Tap the browser menu (⋮)
3. Select "Add to Home Screen"

**On Desktop:**
1. Open the PWA in Chrome
2. Click the install icon in the address bar

### Programmatic Install

Use the included `usePWAInstall` hook:

```tsx
import { usePWAInstall } from '@/hooks/usePWAInstall';

function InstallBanner() {
  const { isInstallable, isInstalled, promptInstall } = usePWAInstall();

  // Already installed as PWA
  if (isInstalled) return null;

  // Can't be installed (not supported or already prompted)
  if (!isInstallable) return null;

  return (
    <button onClick={promptInstall}>
      Install App
    </button>
  );
}
```

The hook provides:
- `isInstallable` - Browser supports install and prompt is available
- `isInstalled` - Running as installed PWA (standalone mode)
- `promptInstall()` - Trigger the install prompt

## Service Worker & Caching

The template uses `next-pwa` with pre-configured caching strategies:

| Content | Strategy | Cache Duration |
|---------|----------|----------------|
| Solana API | NetworkFirst | 5 minutes |
| Images | CacheFirst | 30 days |
| Fonts | CacheFirst | 1 year |
| JS/CSS | StaleWhileRevalidate | 7 days |

### Configuration

Edit `next.config.ts` to customize caching:

```ts
const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\..*\.solana\.com/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'solana-api-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 5,
        },
      },
    },
    // Add more patterns...
  ],
});
```

## Offline Support

### Checking Online Status

```tsx
import { useState, useEffect } from 'react';

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}
```

### Offline UI

```tsx
function OfflineBanner() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed top-0 inset-x-0 bg-yellow-500 text-black text-center py-2">
      You're offline. Some features may be unavailable.
    </div>
  );
}
```

::: tip
Cached pages and assets remain available offline. Wallet transactions require network connectivity.
:::

## Notifications

Request permission and send notifications:

```tsx
async function enableNotifications() {
  if (!('Notification' in window)) {
    console.log('Notifications not supported');
    return false;
  }

  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

function sendNotification(title: string, body: string) {
  if (Notification.permission !== 'granted') return;

  new Notification(title, {
    body,
    icon: '/icons/icon-192x192.png',
  });
}
```

::: warning
Request notification permission only after user interaction (e.g., button click). Prompting on page load leads to high denial rates.
:::

## Standalone Detection

Check if running as installed PWA:

```tsx
function useIsStandalone() {
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as any).standalone === true;

    setIsStandalone(standalone);
  }, []);

  return isStandalone;
}
```

Or use the `isInstalled` property from `usePWAInstall`.

## Testing

### Service Worker

1. Build for production: `npm run build`
2. Start: `npm run start`
3. Open DevTools → Application → Service Workers
4. Verify service worker is registered

### Offline Mode

1. DevTools → Network → Check "Offline"
2. Verify cached pages load
3. Verify offline UI appears

### Installation

1. Deploy to HTTPS host
2. Open in Chrome
3. Verify install prompt appears
4. Test installed app behavior
