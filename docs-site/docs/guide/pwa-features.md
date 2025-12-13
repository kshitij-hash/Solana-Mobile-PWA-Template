# PWA Features

The template is a fully-featured Progressive Web App with offline support, installability, and native-like behavior.

## Installation

### On Mobile (Chrome)

1. Open your deployed PWA in Chrome
2. Tap the browser menu (⋮)
3. Select "Add to Home Screen"
4. The app installs with your icon and name

### On Desktop

1. Open the PWA in Chrome
2. Click the install icon in the address bar
3. Or use the menu: ⋮ → "Install app"

## Programmatic Install Prompt

Use the included hook to show a custom install prompt:

```tsx
import { usePWAInstall } from '@/hooks/usePWAInstall';

function InstallButton() {
  const { canInstall, install } = usePWAInstall();

  if (!canInstall) return null;

  return (
    <button onClick={install}>
      Install App
    </button>
  );
}
```

## Service Worker

The template uses `next-pwa` for service worker management:

### Features

- **Precaching** - App shell cached on install
- **Runtime caching** - API responses cached

### Configuration

Edit `next.config.js`:

```js
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\.mainnet-beta\.solana\.com/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'solana-api',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60, // 1 minute
        },
      },
    },
  ],
});
```

## Standalone Detection

Detect if running as installed PWA:

```tsx
function useStandalone() {
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    setIsStandalone(mediaQuery.matches);

    const handler = (e) => setIsStandalone(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return isStandalone;
}
```

## Web App Manifest

Located at `public/manifest.json`:

```json
{
  "name": "Solana Mobile PWA",
  "short_name": "SolanaPWA",
  "description": "Mobile-optimized Solana PWA",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#9945FF",
  "theme_color": "#9945FF",
  "orientation": "portrait-primary",
  "icons": [...],
  "shortcuts": [
    {
      "name": "Connect Wallet",
      "url": "/wallet",
      "icons": [...]
    }
  ]
}
```

### Display Modes

| Mode | Description |
|------|-------------|
| `standalone` | App-like, no browser UI |
| `fullscreen` | No status bar (games) |
| `minimal-ui` | Minimal browser controls |
| `browser` | Regular browser tab |

## Notifications

Request permission and send notifications:

```tsx
async function requestNotificationPermission() {
  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

function sendNotification(title: string, body: string) {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-72x72.png',
    });
  }
}
```

## Offline Support

### Checking Online Status

```tsx
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
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
function App() {
  const isOnline = useOnlineStatus();

  if (!isOnline) {
    return (
      <div className="offline-banner">
        You're offline. Some features may be unavailable.
      </div>
    );
  }

  return <MainApp />;
}
```

## App Shortcuts

Define shortcuts in `manifest.json`:

```json
{
  "shortcuts": [
    {
      "name": "Connect Wallet",
      "short_name": "Wallet",
      "description": "Connect your Solana wallet",
      "url": "/wallet",
      "icons": [
        {
          "src": "/icons/icon-192x192.png",
          "sizes": "192x192"
        }
      ]
    },
    {
      "name": "Send SOL",
      "short_name": "Send",
      "url": "/send",
      "icons": [...]
    }
  ]
}
```

Users can long-press the app icon to see shortcuts.

## Best Practices

1. **Test offline mode** - Disconnect network and verify behavior
2. **Optimize caching** - Cache critical resources, not everything
3. **Handle updates** - Show "Update available" prompts
4. **Test installation** - Verify icons and name display correctly
5. **Monitor service worker** - Check DevTools → Application → Service Workers
