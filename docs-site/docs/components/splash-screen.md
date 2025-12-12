# Splash Screen

Animated loading screen for app launch.

## Overview

The template includes two splash screen implementations:

1. **SplashScreen** - CSS-based, lightweight
2. **AnimatedSplashScreen** - Framer Motion, more effects

## Basic Usage

```tsx
import { SplashScreen } from '@/components/splash/SplashScreen';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return (
      <SplashScreen
        onComplete={() => setShowSplash(false)}
        minDisplayTime={1500}
      />
    );
  }

  return <MainApp />;
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onComplete` | `() => void` | - | Called when splash should hide |
| `minDisplayTime` | `number` | 1500 | Minimum display time in ms |

## CSS Splash Screen

Lightweight splash using CSS animations:

```tsx
// src/components/splash/SplashScreen.tsx
export function SplashScreen({ onComplete, minDisplayTime = 1500 }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300); // Wait for fade out
    }, minDisplayTime);

    return () => clearTimeout(timer);
  }, [minDisplayTime, onComplete]);

  if (!isVisible) {
    return (
      <div className="splash-screen splash-fade-out">
        <Logo />
      </div>
    );
  }

  return (
    <div className="splash-screen">
      <Logo />
      <h1 className="splash-title">Your App</h1>
      <LoadingDots />
    </div>
  );
}
```

### CSS Styles

```css
/* src/styles/splash.css */
.splash-screen {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--color-background);
  z-index: 9999;
}

.splash-fade-out {
  animation: fadeOut 0.3s ease-out forwards;
}

@keyframes fadeOut {
  to {
    opacity: 0;
  }
}

.splash-title {
  font-size: 24px;
  font-weight: 600;
  margin-top: 16px;
  color: var(--color-text-primary);
}
```

## Animated Splash Screen

Rich animations using Framer Motion:

```tsx
// src/components/splash/AnimatedSplashScreen.tsx
import { motion, AnimatePresence } from 'framer-motion';

export function AnimatedSplashScreen({ onComplete, minDisplayTime = 1500 }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, minDisplayTime);

    return () => clearTimeout(timer);
  }, [minDisplayTime]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          className="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Logo />
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="splash-title"
          >
            Your App
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <LoadingDots />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

## Loading Indicator

Animated loading dots:

```tsx
function LoadingDots() {
  return (
    <div className="loading-dots">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}
```

```css
.loading-dots {
  display: flex;
  gap: 8px;
  margin-top: 24px;
}

.loading-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-primary);
}
```

## Custom Logo

Replace the default logo:

```tsx
function YourLogo() {
  return (
    <svg viewBox="0 0 100 100" className="splash-logo">
      {/* Your SVG paths */}
    </svg>
  );
}

// Or use an image
function YourLogo() {
  return (
    <img
      src="/icons/icon-512x512.png"
      alt="Logo"
      className="splash-logo"
    />
  );
}
```

```css
.splash-logo {
  width: 80px;
  height: 80px;
}
```

## TWA Integration

For TWA apps, you get a two-layer splash:

1. **Native splash** - Android shows immediately (from TWA config)
2. **PWA splash** - Your animated splash takes over

This creates a seamless transition with no white flash.

### TWA Splash Config

`twa/twa-manifest.json`:

```json
{
  "themeColor": "#9945FF",
  "backgroundColor": "#0a0a0a",
  "splashScreenFadeOutDuration": 300
}
```

## Standalone Detection

Show different behavior for installed PWA vs browser:

```tsx
function SplashScreen({ onComplete }) {
  const isStandalone = useStandalone();

  // Skip splash in browser
  if (!isStandalone) {
    useEffect(() => onComplete(), []);
    return null;
  }

  return <AnimatedSplash onComplete={onComplete} />;
}
```

## Best Practices

1. **Keep it brief** - 1.5-2 seconds max
2. **Show loading indicator** - Users know something is happening
3. **Match brand colors** - Consistent with your theme
4. **Test on slow devices** - Ensure smooth animations
5. **Consider skip option** - For returning users
